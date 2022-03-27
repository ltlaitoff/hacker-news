import React from 'react'
import MainPageTemplate from './MainPageTemplate'

export const Home = () => <MainPageTemplate type='front_page' />
export const Stories = () => <MainPageTemplate type='story' />
export const Comments = () => <MainPageTemplate type='comment' />
export const Polls = () => <MainPageTemplate type='poll' />
export const Show = () => <MainPageTemplate type='show_hn' />
export const Ask = () => <MainPageTemplate type='ask_hn' />
