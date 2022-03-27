import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Search } from 'api/apiTypes'
import { getBySearch } from 'api/api'

interface MainPageTemplateProps {
	type: string
}

const MainPageTemplate: FC<MainPageTemplateProps> = ({
	type
}: MainPageTemplateProps) => {
	const [items, setItems] = useState<Search | null>(null)

	useEffect(() => {
		getBySearch('', type).then(value => setItems(value))
	})

	return <div>{items && JSON.stringify(items)}</div>
}

export default MainPageTemplate
