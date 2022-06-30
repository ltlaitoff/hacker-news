import React, { FC, Suspense, useEffect } from 'react'
import Header from 'components/Header'

import Router from 'routes'
import Loader from 'components/Loader'
import { onKeyPressObserver } from 'observers'

const App: FC = () => {
	useEffect(() => {
		onKeyPressObserver.mount()

		return () => {
			onKeyPressObserver.unmount()
		}
	}, [])

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
