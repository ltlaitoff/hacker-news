import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemInfo } from 'api'
import { Item } from 'api/api.interfaces'

interface P {
	id: number | undefined
}

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
		getItemInfo(numberId).then(data => setItemInfo(data))
	}, [])

	if (error) return null

	return <div>{JSON.stringify(itemInfo, null, 2)}</div>
}

export default PostComments
