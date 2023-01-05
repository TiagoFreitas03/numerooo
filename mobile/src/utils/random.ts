/**
 * Gera um número inteiro aleatório entre 0 e 10 ^ length
 * @param length Quantidade de dígitos do número
 */
export function generateRandom(length: number) {
	const num = Math.floor(Math.random() * Math.pow(10, length))

	return num.toString().padStart(length, '0')
}
