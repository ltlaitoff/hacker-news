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
		getBySearch('', type).then(value => setItems(value))
	}, [])

	const Item = renderTypes(renderType)

	return (
		<div>
			{items?.data.hits.map((item, index) => {
				console.log(
					'%cMyProject%cline:38%citem',
					'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
					'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
					'color:#fff;background:rgb(237, 222, 139);padding:3px;border-radius:2px',
					item
				)
				return <Item data={item} key={index} />
			})}
		</div>
	)
}

export default MainPageRecords
