export const checkOnMinMax = (
	value: number,
	{ min, max }: { min: number; max: number }
) => min < value && value < max

export const checkOnMinMaxIncludes = (
	value: number,
	{ min, max }: { min: number; max: number }
) => min <= value && value <= max
