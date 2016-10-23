/* globals ENV */

class Helper {
	static getRandomIntInclusive (min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	static debug (msg) {
		if (ENV === 'debug') console.debug(msg)
	}
}

module.exports = Helper