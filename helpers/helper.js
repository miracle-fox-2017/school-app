class Helper {
	static getScoreLetter(score) {
		let result = '';

		if (score === null || typeof score === 'undefined') {
			return 'Empty';
		}

		if (score > 85) {
			return result = 'A';
		}

		if (score > 70) {
			return result = 'B'
		}

		if (score > 55) {
			return result = 'C'
		}

		if (score <= 55) {
			return result = 'E'
		}
	}
}

module.exports = Helper;