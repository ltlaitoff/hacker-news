import React, { FC, useState, useEffect, FormEvent } from 'react'

import { Search as APISearch } from 'api/api.interfaces'
import { getBySearch } from 'api/api'
import Post from 'components/Post'
import Comment from 'components/Comment'
import { MainPageTemplateProps } from './MainPageTemplate.interfaces'
import Loader from 'components/Loader'
import Filter from 'components/Filter'
import RecordSelection from 'components/RecordSelection'

const renderTypes = (type: string): FC<any> => {
	switch (type) {
		case 'default':
			return Post
		case 'comment':
			return Comment
	}

	throw new Error('renderTypesError')
}

const MainPageTemplate: FC<MainPageTemplateProps> = ({
	renderType,
	type
}: MainPageTemplateProps) => {
	const [items, setItems] = useState<APISearch | null>(null)
	const [searchValue, setSearchValue] = useState<string>('')

	useEffect(() => {
		let tags: string | Array<string> | undefined = type
		let searchByDate: boolean = false

		switch (type) {
			case 'new':
				tags = ['front_page', 'story', 'poll', 'show_hn', 'ask_hn']
				searchByDate = true
		}

		getBySearch({ tags: tags, searchByDate: searchByDate }).then(value => {
			setItems(value)
		})
	}, [])

	const Item = renderTypes(renderType)

	// const onSearchChange = (value: string) => {
	// 	console.log(value)
	// 	setSearchValue(value)
	// }

	return (
		<>
			{items ? (
				<>
					<RecordSelection />
					{items.data.hits.map((item, index) => {
						return <Item {...item} key={index} />
					})}
				</>
			) : (
				<Loader />
			)}
		</>
	)
}

export default MainPageTemplate
