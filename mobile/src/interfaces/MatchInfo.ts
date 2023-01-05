/** Informações da partida */
export interface MatchInfo {
	/** Digitos nas posições corretas */
	correct: number[]

	/** Digitos nas posiçoes incorretas */
	incorrect: number[]

	/** Digitos que não fazem parte do número certo */
	notInNumber: number[]
}

export const initialMatchInfoValue: MatchInfo = {
	correct: [],
	incorrect: [],
	notInNumber: [],
}
