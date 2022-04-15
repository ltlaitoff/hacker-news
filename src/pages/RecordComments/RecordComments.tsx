import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemInfo } from 'api'
import { Item } from 'api/api.interfaces'
import ParentRecord from './components/ParentRecord'
import Comments from './components/Comments'
import Loader from 'components/Loader'

const RecordComments: FC = () => {
	const [recordInfo, setRecordInfo] = useState<Item | null>(null)
	let { id } = useParams()

	useEffect(() => {
		const numberId: number = Number(id)

		getItemInfo(numberId).then(value => setRecordInfo(value))
	}, [])

	const Main = () => {
		if (recordInfo) {
			const parentRecordData = recordInfo.data
			const comments = recordInfo.data.children

			return (
				<>
					<ParentRecord data={parentRecordData} />
					<Comments comments={comments} />
				</>
			)
		}

		return null
	}

	return <div>{recordInfo !== null ? <Main /> : <Loader />}</div>
}

export default RecordComments
