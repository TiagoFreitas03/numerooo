import { COLORS } from '../theme'

/**
 * Retorna se o texto é um dígito
 * @param text Texto para ser avaliado
 */
const isDigit = (text: string) => '0123456789'.split('').includes(text)

/**
 * Valida o número digitado na tentativa
 * @param attempt Número digitado
 * @param correctNumber Número que deve ser adivinhado
 */

function validateAttempt(attempt: string, correctNumber: string) {
	const numberSize = correctNumber.length
	const num = Number(attempt)
	const correctNum = Number(correctNumber)

	if (attempt.length !== numberSize || isNaN(num)) {
		throw new Error('Número inválido')
	}

	/** Dígitos da tentativa */
	const attemptDigits = attempt.split('')
	/** Dígitos do número correto */
	const correctDigits = correctNumber.split('')

	/** digitos na posição correta */
	const correct: number[] = []
	/** digitos na posição correta */
	const incorrect: number[] = []
	/** cores para cada posição */
	const colors = Array.from({ length: correctNumber.length }).map(() => COLORS.GRAY_900)

	// Digitos nas posições corretas
	for (let index = 0; index < correctDigits.length; index++) {
		const digit = attemptDigits[index]

		if (digit === correctDigits[index]) {
			correct.push(Number(digit))
			correctDigits[index] = ''
			attemptDigits[index] = ''
			colors[index] = COLORS.GREEN
		}
	}

	// Digitos nas posições incorretas
	for (let index = 0; index < correctDigits.length; index++) {
		const digit = attemptDigits[index]

		if (correctDigits.includes(digit) && digit !== '') {
			incorrect.push(Number(digit))

			const pos = correctDigits.indexOf(digit)
			correctDigits[pos] = ''
			attemptDigits[index] = ''
			colors[index] = COLORS.ORANGE
		}
	}

	/** Dica */
	const hint: string = num !== correctNum ? num < correctNum ? 'MAIOR' : 'MENOR' : ''

	return {
		correct: correct.slice(),
		incorrect: incorrect.slice(),
		notInNumber: attemptDigits.filter(d => d !== '').map(Number),
		hint,
		colors: colors.slice()
	}
}

export { isDigit, validateAttempt }
