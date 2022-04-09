module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			spacing: {
				0: '0rem',
				14: '3.5rem',
				28: '7rem',
				42: '10.5rem',
				56: '14rem',
				70: '17.5rem',
				84: '21rem',
				98: '24.5rem',
				112: '28rem',
				126: '31.5rem',
				140: '35rem'
			},
			dropShadow: {
				'pink-400': [
					'0 0 4px rgba(244, 114, 182, .3)',
					'0 0px 5px rgba(232, 121, 249, .3)'
				],
				'pink-400-02': [
					'0 0 4px rgba(244, 114, 182, .2)',
					'0 0px 5px rgba(232, 121, 249, .2)'
				],
				'sky-400': [
					'0 0 4px rgba(56, 189, 248, .3)',
					'0 0px 5px rgba(59, 130, 246, .3)'
				],
				'sky-400-01': [
					'0 0 4px rgba(56, 189, 248, .1)',
					'0 0px 5px rgba(59, 130, 246, .1)'
				]
			}
		}
	},
	plugins: []
}
