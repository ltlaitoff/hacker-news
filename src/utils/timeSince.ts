interface Interval {
	label: string
	seconds: number
}

const intervals: Interval[] = [
	{ label: 'year', seconds: 31536000 },
	{ label: 'month', seconds: 2592000 },
	{ label: 'day', seconds: 86400 },
	{ label: 'hour', seconds: 3600 },
	{ label: 'minute', seconds: 60 },
	{ label: 'second', seconds: 1 }
]

export function timeSince(timestamp: number): string {
	if (timestamp < 0) {
		throw new Error('timeSince error: timestamp is not valid')
	}

	const date = new Date(timestamp * 1000)

	const seconds: number = Math.floor((Date.now() - date.getTime()) / 1000)

	const interval: Interval | undefined = intervals.find(
		i => i.seconds < seconds
	)

	if (!interval) {
		throw new Error('timeSince error: interval error')
	}

	const count: number = Math.floor(seconds / interval.seconds)

	return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`
}
