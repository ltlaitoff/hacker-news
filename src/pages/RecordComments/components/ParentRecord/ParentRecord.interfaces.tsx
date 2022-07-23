import { ItemComment, ItemStory } from 'api/api.interfaces'

export interface ParentRecordProps {
	data: ItemStory | ItemComment
	className?: string
}
