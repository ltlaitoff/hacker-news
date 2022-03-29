import React from 'react'
import MainPageRecords from 'containers/MainPageRecords'

import { default as Profile } from './Profile'
import { default as PostComments } from './PostComments'

export const Home = () => (
	<MainPageRecords renderType='default' type='front_page' />
)

export const Stories = () => (
	<MainPageRecords renderType='default' type='story' />
)

export const Comments = () => (
	<MainPageRecords renderType='comment' type='comment' />
)

export const Polls = () => <MainPageRecords renderType='default' type='poll' />

export const Show = () => (
	<MainPageRecords renderType='default' type='show_hn' />
)

export const Ask = () => <MainPageRecords renderType='default' type='ask_hn' />

export { Profile, PostComments }
