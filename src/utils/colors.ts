const colors = require('colors/safe')

class ColoredConsoleLogTemplates {
	note(message: string) {
		const clgMessage = colors.green(`${colors.bold(' Note:')} ${message} `)
		console.log(clgMessage)
	}
	optimize(message: string) {
		const clgMessage = colors.blue(`${colors.bold(' Optimize:')} ${message} `)
		console.log(clgMessage)
	}
	todo(message: string) {
		const clgMessage = colors.magenta(`${colors.bold(' TODO:')} ${message} `)
		console.log(clgMessage)
	}
	hack(message: string) {
		const clgMessage = colors.brightYellow(
			`${colors.bold(' Hack:')} ${message} `
		)
		console.log(clgMessage)
	}
	xxx(message: string) {
		const clgMessage = colors.black.bgBrightYellow(
			`${colors.rainbow(' XXX:')} ${message} `
		)
		console.log(clgMessage)
	}
	fixme(message: string) {
		const clgMessage = colors.red(`${colors.bold(' FIXME:')} ${message} `)
		console.log(clgMessage)
	}
	bug(message: string) {
		const clgMessage = colors.white.bgRed(`${colors.bold(' BUG:')} ${message} `)
		console.log(clgMessage)
	}
}

export default new ColoredConsoleLogTemplates()
