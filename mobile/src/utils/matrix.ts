/**
 * Gera a matriz de posições da partida
 * @param rows Quantidade de linhas
 * @param cols Quantidade de colunas
 */
export function generateMatrix(rows: number, cols: number) {
	return Array.from({ length: rows }).map(() => {
		return Array.from({ length: cols }).map(() => '')
	})
}
