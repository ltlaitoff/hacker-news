import {
	FilterTemplate,
	FilterBaseType,
	FilterBaseName
} from 'typescript/filters'

export const filters: FilterTemplate[] = [
	{
		id: 0,
		type: FilterBaseType.DATE,
		name: FilterBaseName.DATE,
		filtrations: [
			'is',
			'is before',
			'is after',
			'is on or before',
			'is on or after',
			'is within'
		]
	},
	{
		id: 1,
		type: FilterBaseType.NUMBER,
		name: FilterBaseName.COMMENTS,
		filtrations: [
			'is',
			'is bigger',
			'is lower',
			'is on or bigger',
			'is on or lower',
			'is between'
		]
	},
	{
		id: 2,
		type: FilterBaseType.NUMBER,
		name: FilterBaseName.POINTS,
		filtrations: [
			'is',
			'is bigger',
			'is lower',
			'is on or bigger',
			'is on or lower',
			'is between'
		]
	},
	{
		id: 3,
		type: FilterBaseType.STRING,
		name: FilterBaseName.AUTHOR,
		filtrations: ['is']
	}
]
