export interface Item {
	id: number
	created_at: string
	created_at_i: number
	type: 'story' | 'comment'
	author: string
	title: string | null
	url: string | null
	text: string | null
	points: number | null
	parent_id: number | null
	story_id: number | null
	children: Array<Item>
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
	url: string
	author: string
	points: number
	num_comments: number

	created_at_i: number
	relevancy_score: number
	_tags: Array<string>
	objectID: string
	_highlightResult: {
		title: {
			value: string
			matchLevel: string
			fullyHighlighted: boolean
			matchedWords: Array<string>
		}
		url: {
			value: string
			matchLevel: string
			fullyHighlighted: boolean
			matchedWords: Array<string>
		}
		author: {
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
