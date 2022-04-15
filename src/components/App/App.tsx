import React, { FC, Suspense } from 'react'
import Header from 'components/Header'

import Router from 'routes'
import Loader from 'components/Loader'

const App: FC = () => {
	return (
		<div className='m-0-auto w-4/5 mx-auto my-0'>
			<Suspense fallback={<Loader type='pink' />}>
				<Router>
					<Header />
				</Router>
			</Suspense>
		</div>
	)
}

export default App
