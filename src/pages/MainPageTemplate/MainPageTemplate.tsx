import React, { FC, useState, useEffect, FormEvent } from 'react'

import { Search as APISearch } from 'api/api.interfaces'
import { getBySearch } from 'api'
import Post from 'components/Post'
import Comment from 'components/Comment'
import { MainPageTemplateProps } from './MainPageTemplate.interfaces'
import Loader from 'components/Loader'
import RecordSelection from 'components/RecordSelection'
import { useLocation } from 'react-router-dom'
import { getRouteNameByPath } from 'routes/helpers'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'

const renderTypes = (type: string): FC<any> => {
	switch (type) {
		case 'default':
			return Post
		case 'comment':
			return Comment
	}

	throw new Error('renderTypesError')
}

/*
	TODO: API Errors handling
*/

const MainPageTemplate: FC<MainPageTemplateProps> = ({
	renderType,
	type
}: MainPageTemplateProps) => {
	const [items, setItems] = useState<APISearch | null>(null)

	const location = useLocation()
	const currentPage = getRouteNameByPath(location.pathname)

	if (currentPage === undefined) {
		throw new Error('location error')
	}

	const dispatch = useAppDispatch()
	const state = useAppSelector(state => state)

	useEffect(() => {
		let tags: string | Array<string> | undefined = type
		let searchByDate: boolean = false

		switch (type) {
			case 'new':
				tags = ['front_page', 'story', 'poll', 'show_hn', 'ask_hn']
				searchByDate = true
		}

		console.log('rerender')

		getBySearch({
			searchValue: state.searches[currentPage],
			filters: state.filters[currentPage],
			page: 1
		}).then(value => {
			setItems(value)
		})
	}, [dispatch, state])

	const Item = renderTypes(renderType)

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
