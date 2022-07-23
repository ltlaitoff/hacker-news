import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemInfo } from 'api'
import { Item } from 'api/api.interfaces'
import { Comments, ParentRecord } from './components'
import Loader from 'components/Loader'

const RecordComments: FC = () => {
	const [recordInfo, setRecordInfo] = useState<Item | null>(null)
	let { id } = useParams()

	useEffect(() => {
		const numberId: number = Number(id)

		getItemInfo(numberId).then(value => setRecordInfo(value))
		/* TODO: Add catch error */
	}, [id])

	return (
		<div>
			{recordInfo !== null ? (
				<>
					<ParentRecord data={recordInfo.data} />
					<Comments comments={recordInfo.data.children} />
				</>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default RecordComments
