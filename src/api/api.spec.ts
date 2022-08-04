import { getBySearch as apiGetBySearch, getItemInfo, getUserInfo } from '.'

const mockGetFromAPI = jest.fn()

jest.mock('./fetch', () => ({
	getFromAPI: (value: any) => mockGetFromAPI(value)
}))

const mockGetBySearchURL = jest.fn(
	value => `getBySearchURL_result_${JSON.stringify(value)}`
)
const mockGetItemInfoURL = jest.fn(value => `getItemInfoURL_result_${value}`)
const mockGetUserInfoURL = jest.fn(value => `getUserInfoURL_result_${value}`)

jest.mock('./functions', () => ({
	getBySearchURL: (value: any) => mockGetBySearchURL(value),
	getItemInfoURL: (value: any) => mockGetItemInfoURL(value),
	getUserInfoURL: (value: any) => mockGetUserInfoURL(value)
}))

describe('api', () => {
	describe.each`
		id
		${0}
		${100}
		${1000}
	`('getItemInfo with id = $id', ({ id }) => {
		it(`should call getItemInfoURL with id = ${id}`, () => {
			getItemInfo(id)

			expect(mockGetItemInfoURL).toBeCalledWith(id)
		})

		it(`should call getFromAPI with value = "getItemInfoURL_result_${id}"`, () => {
			getItemInfo(id)

			expect(mockGetFromAPI).toBeCalledWith(`getItemInfoURL_result_${id}`)
		})
	})

	describe.each`
		user
		${'test'}
		${'user'}
		${'gg'}
	`('getUserInfo with user = $user', ({ user }) => {
		it(`should call getUserInfoURL with user = ${user}`, () => {
			getUserInfo(user)

			expect(mockGetUserInfoURL).toBeCalledWith(user)
		})

		it(`should call getFromAPI with value = "getUserInfoURL_result_${user}"`, () => {
			getUserInfo(user)

			expect(mockGetFromAPI).toBeCalledWith(`getUserInfoURL_result_${user}`)
		})
	})

	describe.each`
		searchValue      | filters                       | page   | sorting
		${'test'}        | ${[]}                         | ${1}   | ${'DEFAULT'}
		${'queery'}      | ${[{ id: 0, value: 'test' }]} | ${100} | ${'TEST'}
		${'searchValue'} | ${[]}                         | ${1}   | ${'DEFAULT'}
	`(
		'getBySearch with searchValue = $searchValue, filters = $filters, page = $page and sorting = $sorting',
		({ searchValue, filters, page, sorting }) => {
			it(`should call getBySearchURL with ${JSON.stringify({
				searchValue,
				filters,
				page,
				sorting
			})}}`, () => {
				apiGetBySearch({ searchValue, filters, page, sorting })

				expect(mockGetBySearchURL).toBeCalledWith({
					searchValue,
					filters,
					page,
					sorting
				})
			})

			it(`should call getFromAPI with value = "getBySearchURL_result_${JSON.stringify(
				{ searchValue, filters, page, sorting }
			)})"`, () => {
				apiGetBySearch({ searchValue, filters, page, sorting })

				expect(mockGetFromAPI).toBeCalledWith(
					`getBySearchURL_result_${JSON.stringify({
						searchValue,
						filters,
						page,
						sorting
					})}`
				)
			})
		}
	)

	it('getBySearch with searchValue = "", filters = [], page = 0 and sorting = undefined should call getBySearchURL with {"searchValue": "", filters: [], page: 0, sorting: "DEFAULT"}', () => {
		apiGetBySearch({
			searchValue: '',
			filters: [],
			page: 0,
			sorting: undefined
		})

		expect(mockGetBySearchURL).toBeCalledWith({
			searchValue: '',
			filters: [],
			page: 0,
			sorting: 'DEFAULT'
		})
	})
})
