import { MAX_INPUT_LENGTH } from '../constants'

const checkInputValueOnError = (
	value: string,
	onError: (value: boolean) => void
) => {
	if (value.length < 0 || value.length > MAX_INPUT_LENGTH) {
		onError(true)
		return true
	}

	onError(false)
	return false
}

export default checkInputValueOnError
