import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Search } from 'api/apiTypes'
import { getBySearch } from 'api/api'
import Post from 'components/Post'

interface MainPageTemplateProps {
	type: string
}

const MainPageTemplate: FC<MainPageTemplateProps> = ({
	type
}: MainPageTemplateProps) => {
	const [items, setItems] = useState<Search | null>(null)

	useEffect(() => {
		getBySearch('', type).then(value => setItems(value))
	}, [])

	return (
		<div className='gap-y-2 flex flex-col pl-5'>
			{items?.data.hits.map((item, index) => {
				return <Post data={item} key={index} />
			})}
		</div>
	)
}
export default MainPageTemplate
