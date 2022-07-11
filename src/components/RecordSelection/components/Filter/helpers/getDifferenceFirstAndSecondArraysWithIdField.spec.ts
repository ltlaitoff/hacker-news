import { getDifferenceFirstAndSecondArraysWithIdField } from './getDifferenceFirstAndSecondArraysWithIdField'

describe('getDifferenceFirstAndSecondArraysWithIdField Filter helper', () => {
	it.each([
		[[{ id: 0 }, { id: 1 }], [{ id: 0 }, { id: 1 }], []],
		[[{ id: 1 }, { id: 2 }], [{ id: 0 }, { id: 1 }], [{ id: 2 }]],
		[[{ id: 1 }, { id: 2 }], [], [{ id: 1 }, { id: 2 }]]
	])(
		'getDifferenceFirstAndSecondArraysWithIdField with first = %j and second = %j should return %j',
		(first, second, result) => {
			expect(
				getDifferenceFirstAndSecondArraysWithIdField(first, second)
			).toStrictEqual(result)
		}
	)
})
