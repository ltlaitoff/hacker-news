// TODO: Move in into helpers
export const checkOnMinMax = (
	value: number,
	{ min, max }: { min: number; max: number }
) => max < value || value < min
