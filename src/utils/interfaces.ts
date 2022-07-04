export interface IAttemptInfo {
	// digitos nas posições corretas
	correctPos: number[]

	// digitos nas posiçoes incorretas
	incorrectPos: number[]

	// digitos que não fazem parte do número certo
	notInNumber: number[]
}

export interface IStats {
	// número total de partidas
	numberOfMatches: number

	// número de vitórias
	victories: number

	// média de tentativas
	averageAttempts: string

	// sequência de vitórias atual
	currentWinStreak: number

	// distribuição de tentativas
	perAttempts: number[]

	// data da última partida
	lastMatch: string
}