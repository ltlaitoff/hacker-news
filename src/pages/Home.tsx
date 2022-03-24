import React, { FC, useEffect, useState } from 'react'
import { Item, User, Search } from 'api/apiTypes'
import { getItemInfo, getUserInfo, getBySearch } from 'api'

const Home: FC = () => {
	const [items, setItems] = useState<Item | null>(null)
	const [user, setUser] = useState<User | null>(null)
	const [search, setSearch] = useState<Search | null>(null)
	useEffect(() => {
		getItemInfo(1).then((result: Item) => {
			setItems(result)
		})
		getUserInfo('noyesno').then((result: User) => {
			setUser(result)
		})
		getBySearch('123').then((result: Search) => {
			setSearch(result)
		})
	}, [])

	return (
		<main>
			items
			<p>{JSON.stringify(items)}</p>
			user
			<p>{JSON.stringify(user)}</p>
			search
			<p>{JSON.stringify(search)}</p>
		</main>
	)
}

export default Home
