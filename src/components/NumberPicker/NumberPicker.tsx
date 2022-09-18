import React, { FC, useCallback, useRef, useState } from 'react'
import classNames from 'classnames'
import {
	NumberPickerProps,
	onChangeType,
	stepType
} from './NumberPicker.interfaces'
import { NumberPickerInput } from './components'
import { DEFAULT, DELAY } from './constants'
import { createInterval } from 'helpers'
import { checkOnMinMax } from './helpers'

/*
	Что мы хотим от этого компонента и зачем он вообще нам нужен
	Этот компонент отвечает за ввод числа пользователем, его проверку на правильность и вызов callback функции при измении значения, под изменением значения имеется ввиду либо нажатие на кнопку(один раз) что приведёт к вызову onChange, или зажатие кнопки(перендер будет только после её отжатия) или ввод значения пользователем(изменение будет только после окончания ввода)
	При ошибке мы хотим что-бы этот компонент вызывал функцию
	А так-же компонент должен принимать проп значения(которое должно хранится выше компонента для того что-бы был один источник правды, иначе будет два источника и они могут разойтись)
	onChange который будет вызыватся при каждом измении значения(выше)
	onChange так-же будет возвращать и то, как это значение было измененно(нажатием кнопки enter, кнопки или интервалом, это будет нужно для того, что-бы при нажатии enter вверхний компонент делал subm)
	error(для единственного источника правды) - проп который будет отвечать за ошибку и существует только для стилизации
	onError который будет измения ошибку(в большую или меньшую сторону)
	При вызове onError с ошибкой
*/
const NumberPicker: FC<NumberPickerProps> = ({
	value,
	onChange,
	error,
	onError = () => {},
	disabled,
	max = DEFAULT.MAX,
	min = DEFAULT.MIN,
	className,
	...args
}: NumberPickerProps) => {
	const [currentValue, setCurrentValue] = useState<number>(
		value || DEFAULT.VALUE
	)
	const repeaterRef = useRef<(() => void) | null>(null)

	const onSubmit = useCallback(
		(number: number, type: onChangeType) => {
			if (disabled) return

			if (checkOnMinMax(number, { min, max })) return

			setCurrentValue(number)
			onChange(number, type)
		},
		[disabled, onChange, min, max]
	)

	const step = (type: stepType): boolean => {
		let error = false

		setCurrentValue((value: number) => {
			const nextValue = type === stepType.UP ? value + 1 : value - 1

			if (checkOnMinMax(nextValue, { min: min, max: max })) {
				error = true
				return value
			}

			return nextValue
		})

		return error
	}

	const onMouseDown = (type: stepType) => {
		onError(false)

		if (step(type)) {
			onMouseUp()
			return
		}

		if (!repeaterRef.current) {
			repeaterRef.current = createInterval(
				() => onMouseDown(type),
				DELAY.BEFORE,
				DELAY.INTERVAL
			)
		}
	}

	const onMouseUp = () => {
		onChange(currentValue, onChangeType.INTERVAL)

		if (!repeaterRef.current) return

		repeaterRef.current()
		repeaterRef.current = null
	}

	const buttonsClass = classNames('px-3 border h-full bg-gray-200')

	return (
		<div
			className={classNames('flex items-center w-56 shadow', className)}
			data-testid='picker'
			{...args}
		>
			<button
				className={buttonsClass}
				tabIndex={-1}
				onMouseUp={onMouseUp}
				onMouseDown={() => onMouseDown(stepType.UP)}
				onMouseLeave={onMouseUp}
			>
				+
			</button>
			<NumberPickerInput
				className='w-full'
				key={currentValue}
				value={currentValue}
				onSubmit={onSubmit}
				error={error}
				onError={onError}
				max={max}
				min={min}
				disabled={disabled}
			/>
			<button
				className={buttonsClass}
				tabIndex={-1}
				onMouseUp={onMouseUp}
				onMouseDown={() => onMouseDown(stepType.DOWN)}
				onMouseLeave={onMouseUp}
			>
				-
			</button>
		</div>
	)
}

export default React.memo(NumberPicker)
