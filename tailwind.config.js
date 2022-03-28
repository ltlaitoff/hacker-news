module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
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
