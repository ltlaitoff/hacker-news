import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemInfo } from 'api'
import { Item } from 'api/api.interfaces'
import Post from 'components/Post'

/* 
	Здесь берём данные и рендерим обёртку, родительский пост и вызываем компонент внутренних коментариев
	Внутренний компонент рендерит рекурсией некоторые Items, которые в итоге преобразовуются в Comment(потому что нам будет удобнее рендерить именно comment)

	Момент #1: Нам нужно как-то отрендерить root ссылку только в компонентах от третьего уровня вложености
	В Comment создать две версии - версия в виде поста на главную страницу и версия в виде реального коммента

	Нужно будет создать модель связей компонентов что-бы понимать что за что отвечает

	
*/

const PostComments: FC = () => {
	let { id } = useParams()
	const [error, setError] = useState<boolean>(false)
	const [itemInfo, setItemInfo] = useState<Item>()

	useEffect(() => {
		if (id === undefined) {
			setError(true)
			return
		}

		const numberId: number = Number(id)
		getItemInfo(numberId).then(value => {
			setItemInfo(value)
		})
	}, [])

	if (error) return null

	if (!itemInfo) return null

	const data = itemInfo.data

	data.type
	return (
		<div>
			<Post
				points={data.points}
				title={data.title}
				url={data.url}
				objectID={String(data.id)}
				author={data.author}
				created_at_i={data.created_at_i}
				num_comments={0}
				noComments={true}
			/>
			{data.children.map(item => {})}
			{JSON.stringify(itemInfo, null, 2)}
		</div>
	)
}

export default PostComments
