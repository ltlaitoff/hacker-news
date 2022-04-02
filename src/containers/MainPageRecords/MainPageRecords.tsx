import React, { FC, ReactElement, useState, useEffect } from 'react'

import { Search } from 'api/api.interfaces'
import { getBySearch } from 'api/api'
import Post from 'components/Post'
import Comment from 'components/Comment'

interface MainPageRecordsProps {
	renderType: string
	type: string
}

const renderTypes = (type: string): FC<any> => {
	switch (type) {
		case 'default':
			return Post
		case 'comment':
			return Comment
	}

	throw new Error('renderTypesError')
}

const MainPageRecords: FC<MainPageRecordsProps> = ({
	renderType,
	type
}: MainPageRecordsProps) => {
	const [items, setItems] = useState<Search | null>(null)

	useEffect(() => {
		getBySearch({ query: '', tags: type }).then(value => setItems(value))
	}, [])

	const Item = renderTypes(renderType)

	return (
		<>
			{items?.data.hits.map((item, index) => {
				return <Item data={item} key={index} />
			})}
		</>
	)
}

export default MainPageRecords
