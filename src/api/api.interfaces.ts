interface ItemMain {
	id: number
	created_at: string
	created_at_i: number
	author: string
	text: string | null
}

export interface ItemStory extends ItemMain {
	type: 'story'
	title: string
	url: string
	points: number
	parent_id: null
	story_id: null
	children: Array<ItemComment>
}

export interface ItemComment extends ItemMain {
	type: 'comment'
	title: null
	url: null
	points: null
	parent_id: number
	story_id: number
	children: Array<ItemComment>
}

export interface Item {
	data: ItemStory | ItemComment
	status: number
	statusText: string
}

export interface User {
	id: number
	username: string
	about: string
	karma: number
	created_at: string
	avg: number
	delay: null
	submitted: number
	updated_at: string
	submission_count: number
	comment_count: number
	created_at_i: number
	objectID: string
}

export interface Post {
	created_at: string
	title: string
	url: string | null
	author: string
	points: number
	num_comments: number | null
	comment_text: string | null
	story_id: number | null
	story_text: null | string
	story_title: string | null
	story_url: string | null
	parent_id: number | null

	created_at_i: number
	relevancy_score?: number
	_tags: Array<string>
	objectID: string
	_highlightResult: {
		title: {
			value: string
			matchLevel: string
			matchedWords: Array<string>
		}
		story_text?: {
			value: string
			matchLevel: string
			matchedWords: Array<string>
		}
		story_title?: {
			value: string
			matchLevel: string
			matchedWords: Array<string>
		}
		url?: {
			value: string
			matchLevel: string
			matchedWords: Array<string>
		}
		author: {
			value: string
			matchLevel: string
			matchedWords: Array<string>
		}
		comment_text?: {
			value: string
			matchLevel: string
			matchedWords: Array<string>
		}
		story_url?: {
			value: string
			matchLevel: string
			matchedWords: Array<string>
		}
	}
}

export interface Search {
	data: {
		hits: Array<Post>
		nbHits: number
		page: number
		nbPages: number
		hitsPerPage: number
		exhaustiveNbHits: boolean
		exhaustiveTypo: boolean
		query: string
		params: string
		processingTimeMS: number
	}
	status: number
	statusText: string
}

export interface numericFiltersElement {
	less: number
	lessOrEqual: number
	equal: number
	greated: number
	greaterOrEqual: number
}
export interface numericFilters {
	created_at_i: numericFiltersElement
	points: numericFiltersElement
	num_comments: numericFiltersElement
}
export interface getSearchUrlProps {
	query?: string
	tags?: Array<string>
	searchByDate?: boolean
	numericFilters?: numericFilters
	page?: number
}
export interface getBySearchProps {
	query?: string
	tags?: Array<string> | string
	searchByDate?: boolean
	numericFilters?: numericFilters
	page?: number
}
