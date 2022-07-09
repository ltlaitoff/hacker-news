import { getFilterById } from './getFilterById'

describe('getFilterById Filter helper', () => {
	/*
		The filter elements were not specified using an array due to problems with dispalaying arrays in jest
		[{ id: 0 }, { id: 1 }] => [[Object], [Object]]
	*/
	it.each`
		firstFilterElement         | secondFilterElement         | id      | result
		${{ id: 0, someField: 0 }} | ${{ id: 1, someField: 1 }}  | ${1}    | ${{ id: 1, someField: 1 }}
		${{ id: 2, someField: 4 }} | ${{ id: 5, someField: 10 }} | ${5}    | ${{ id: 5, someField: 10 }}
		${{ id: 0, someField: 0 }} | ${{ id: 1, someField: 1 }}  | ${null} | ${null}
		${{ id: 1, someField: 1 }} | ${{ id: 2, someField: 2 }}  | ${0}    | ${null}
	`(
		'getFilterById with filters = [$firstFilterElement, $secondFilterElement] and id = $id should return $result',
		({ firstFilterElement, secondFilterElement, id, result }) => {
			const filters = [firstFilterElement, secondFilterElement]

			expect(getFilterById(filters, id)).toStrictEqual(result)
		}
	)
})
