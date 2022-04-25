import React, { FC, useState } from 'react'
import Filter from './components/Filter'
import Search from './components/Search'

const RecordSelection: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('')

	return (
		<div>
			<Search onSubmit={setSearchValue} />
			<Filter />
		</div>
	)
}

export default RecordSelection
