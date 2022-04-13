import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from 'components/Header'

const Default = () => {
	return (
		<>
			<Header />
			<main className='gap-y-2 flex flex-col pl-5'>
				<Outlet />
			</main>
		</>
	)
}

export default Default
