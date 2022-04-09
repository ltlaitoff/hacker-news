import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemInfo } from 'api'
import { Item } from 'api/api.interfaces'
import ParentRecord from './components/ParentRecord'
import Comments from './components/Comments'

const RecordComments: FC = () => {
	const [recordInfo, setRecordInfo] = useState<Item>()
	let { id } = useParams()

	useEffect(() => {
		const numberId: number = Number(id)

		getItemInfo(numberId).then(value => setRecordInfo(value))
	}, [])

	if (!recordInfo) return null

	const parentRecordData = recordInfo.data
	const comments = recordInfo.data.children

	return (
		<div>
			<ParentRecord data={parentRecordData} />
			<Comments comments={comments} />
		</div>
	)
}

export default RecordComments
