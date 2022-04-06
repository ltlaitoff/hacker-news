import React, { ReactElement } from 'react'
import MainPageTemplate from 'containers/MainPageTemplate'

import pagesData from './PagesByMainPageTemplate.data'

export const Home = (): ReactElement => (
	<MainPageTemplate
		renderType={pagesData.home.renderType}
		type={pagesData.home.type}
	/>
)

export const New = (): ReactElement => (
	<MainPageTemplate
		renderType={pagesData.new.renderType}
		type={pagesData.new.type}
	/>
)

export const Stories = (): ReactElement => (
	<MainPageTemplate
		renderType={pagesData.stories.renderType}
		type={pagesData.stories.type}
	/>
)

export const Comments = (): ReactElement => (
	<MainPageTemplate
		renderType={pagesData.comments.renderType}
		type={pagesData.comments.type}
	/>
)

export const Polls = (): ReactElement => (
	<MainPageTemplate
		renderType={pagesData.polls.renderType}
		type={pagesData.polls.type}
	/>
)

export const Show = (): ReactElement => (
	<MainPageTemplate
		renderType={pagesData.show.renderType}
		type={pagesData.show.type}
	/>
)

export const Ask = (): ReactElement => (
	<MainPageTemplate
		renderType={pagesData.ask.renderType}
		type={pagesData.ask.type}
	/>
)
