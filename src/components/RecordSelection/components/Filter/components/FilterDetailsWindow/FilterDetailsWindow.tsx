import React, {
	FC,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useState
} from 'react'
import classNames from 'classnames'
import { ReactComponent as Cross } from 'assets/icons/cross.svg'
import { useEscKeyDown, useOutsideClick } from 'hooks'
import Select from 'components/Select'
import { FilterValuePicker } from '..'
import { transformArrayToOptions } from '../../helpers'
import { FilterDetailsWindowProps } from './FilterDetailsWindow.interfaces'
import { filterDetailsWindowReducer, getDefaultReducerValue } from './reducer'
import { FilterValuePickerFilter } from '../FilterValuePicker/FilterValuePicker.interfaces'

const FilterDetailsWindow: FC<FilterDetailsWindowProps> = ({
	filter,
	currentFilter,
	onSubmit,
	onClose,
	className,
	style,
	...args
}) => {
	const [state, reducerDispatch] = useReducer(
		filterDetailsWindowReducer,
		getDefaultReducerValue(filter, currentFilter)
	)
	const [error, setError] = useState<boolean>(false)
	const [enterKeyPressed, setEnterKeyPressed] = useState<boolean>(false)

	const ref = useOutsideClick(onClose) as React.RefObject<HTMLDivElement>
	const onEscPress = useCallback(onClose, [onClose])

	useEscKeyDown(onEscPress, true)

	useEffect(() => {
		if (enterKeyPressed) {
			onDoneClick()
		}
	}, [enterKeyPressed, state])

	const onChange = useCallback(
		(value: typeof state['value'], type?: 'enterKey' | string) => {
			if (type === 'enterKey') {
				setEnterKeyPressed(true)
			}

			reducerDispatch({ type: 'change-value', payload: value })
		},
		[]
	)

	const onError = useCallback((value: boolean) => setError(value), [])

	const getFilterValuePickerProps = useMemo<FilterValuePickerFilter>(() => {
		return state
	}, [state.type, state.value])

	const selectOptions = useMemo(
		() => transformArrayToOptions(filter.filtrations),
		[filter.filtrations]
	)

	const onSelectItemClick = useCallback(
		(id: number) => {
			const filtration = selectOptions[id]?.label

			reducerDispatch({ type: 'change-filtration', payload: filtration })
		},
		[selectOptions]
	)

	if (filter === null) return null
	if (currentFilter && filter.type !== currentFilter.type) return null

	const onDoneClick = () => {
		if (error) return

		onSubmit(state)
	}

	return (
		<div
			ref={ref}
			className={classNames(
				'absolute h-26 gap-y-3 z-10 bg-white border-2 rounded-lg shadow-stone-700/20 shadow-[0_10px_60px_0_rgba(0,0,0,0.3)]',
				className
			)}
			data-testid='wrapper'
			style={style}
			{...args}
		>
			<div className='relative px-4 py-3'>
				<div className='gap-x-4 flex items-center'>
					<div className='text-lg text-gray-700' data-testid='label-text'>
						{filter.name}
					</div>
					<Select
						options={selectOptions}
						onClick={onSelectItemClick}
						defaultSelectId={selectOptions.findIndex(
							element => element.label === state.filtration
						)}
					/>
				</div>

				<FilterValuePicker
					filter={getFilterValuePickerProps}
					onError={onError}
					error={error}
					onChange={onChange}
				/>

				<div className='flex justify-center'>
					<button
						className={classNames(
							'h-10 px-10 rounded bg-green-500 text-white text-lg hover:bg-green-400 duration-200 black-big-focus-visible',
							{
								'bg-neutral-400 text-neutral-600': error
							}
						)}
						disabled={error}
						onClick={onDoneClick}
						data-testid='done-button'
					>
						Done
					</button>
				</div>

				<button
					className={classNames(
						'absolute top-0 right-0 translate-x-[0.8em] translate-y-[-0.8em] h-7 w-7 rounded-full bg-stone-500 text-white hover:bg-stone-400 duration-200 pink-big-focus-visible flex items-center justify-center fill-white hover:fill-stone-600 shadow-xl'
					)}
					onClick={onClose}
					data-testid='close-button'
				>
					<Cross className='fill-inherit p-[8px]' />
				</button>
			</div>
		</div>
	)
}

export default React.memo(FilterDetailsWindow)
