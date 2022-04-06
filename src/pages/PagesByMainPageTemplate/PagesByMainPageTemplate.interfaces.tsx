interface DataInner {
	renderType: string
	type: string
}

export type Data = Record<string, DataInner>
