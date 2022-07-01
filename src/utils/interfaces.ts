export interface IAttemptInfo {
	// digitos nas posições corretas
	correctPos: number[]

	// digitos nas posiçoes incorretas
	incorrectPos: number[]

	// digitos que não fazem parte do número certo
	notInNumber: number[]
}