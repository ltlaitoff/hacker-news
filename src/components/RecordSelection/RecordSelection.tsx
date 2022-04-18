import React, { FC, useState } from 'react'

import Search from './components/Search'

const RecordSelection: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('')

	return (
		<div>
			<Search onSubmit={setSearchValue} />
			SearchValue: {searchValue}
		</div>
	)
}

export default RecordSelection
