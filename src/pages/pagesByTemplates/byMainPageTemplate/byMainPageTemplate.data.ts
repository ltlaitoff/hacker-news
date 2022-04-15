import { Data } from './byMainPageTemplate.interfaces'

const data: Data = {
	home: {
		renderType: 'default',
		type: 'front_page'
	},
	new: {
		renderType: 'default',
		type: 'new'
	},
	stories: {
		renderType: 'default',
		type: 'story'
	},
	comments: {
		renderType: 'comment',
		type: 'comment'
	},
	polls: {
		renderType: 'default',
		type: 'poll'
	},
	show: {
		renderType: 'default',
		type: 'show_hn'
	},
	ask: {
		renderType: 'default',
		type: 'ask_hn'
	}
}

export default data
