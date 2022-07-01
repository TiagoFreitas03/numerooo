export function isNumber(variable: any) {
	return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(variable)
}

export function isNumberValid(text: string) {
	if (text.length !== 5)
		return false

	if (isNaN(Number(text)))
		return false

	const num = Number(text)

	return (num >= 0 && num <= 99999)
}

export function validateAttempt(guess: string, correctNumber: number) {
	const guessDigits = guess.split('')
	const correctDigits = String(correctNumber).split('')

	const correctPos: number[] = []
	const incorrectPos: number[] = []
	const colors = Array.from({ length: 5 }).map(_ => 'grey-900')

	// correct position digits
	for (let index = 0; index < 5; index++) {
		const digit = guessDigits[index]

		if (digit === correctDigits[index]) {
			correctPos.push(Number(digit))
			correctDigits[index] = ''
			guessDigits[index] = ''
			colors[index] = 'green'
		}
	}

	// incorrect position digits
	for (let index = 0; index < 5; index++) {
		const digit = guessDigits[index]

		if (correctDigits.includes(digit) && digit !== '') {
			incorrectPos.push(Number(digit))

			const pos = correctDigits.indexOf(digit)
			correctDigits[pos] = ''
			guessDigits[index] = ''
			colors[index] = 'orange'
		}
	}

	let hint: string = ''

	if (Number(guess) < correctNumber)
		hint = 'MAIOR'
	else if (Number(guess) > correctNumber)
		hint = 'MENOR'

	return {
		correctPos: correctPos.slice(),
		incorrectPos: incorrectPos.slice(),
		notInNumber: guessDigits.filter(d => d !== '').map(d => Number(d)),
		attemptHint: hint,
		attemptColors: colors.slice()
	}
}