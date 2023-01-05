import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Dimensions, Text, Alert } from 'react-native'

import { Row } from '../components/Row'
import { Keyboard } from '../components/Keyboard'
import { Background } from '../components/Background'
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'
import { MatchInfo, initialMatchInfoValue } from '../interfaces/MatchInfo'
import { isDigit, validateAttempt, generateMatrix, generateRandom, victoryMessages } from '../utils'
import { useGame } from '../contexts/GameContext'

export function Game() {
	const { numberSize, maxAttempts, showHints, saveMatch } = useGame()

	const [randomNumber, setRandonNumber] = useState('')
	const [attempts, setAttempts] = useState<string[][]>([])
	const [colors, setColors] = useState<string[][]>([])
	const [row, setRow] = useState(0)
	const [col, setCol] = useState(0)
	const [info, setInfo] = useState<MatchInfo>(initialMatchInfoValue)
	const [hint, setHint] = useState('...')
	const [gameOver, setGameOver] = useState(false)

	useEffect(() => {
		initializeStates()
	}, [numberSize, maxAttempts, initialMatchInfoValue])

	function initializeStates() {
		const matrix = generateMatrix(maxAttempts, numberSize)

		setRandonNumber(() => generateRandom(numberSize))
		setAttempts(matrix)
		setColors(matrix)
		setRow(0)
		setCol(0)
		setInfo(initialMatchInfoValue)
		setHint('...')
		setGameOver(false)
	}

	function clear(pos: number) {
		if (pos >= 0 && pos < numberSize) {
			const aux = attempts.slice()
			aux[row][pos] = ''
			setAttempts(aux)
		}
	}

	function handleKeyPress(key: string) {
		if (gameOver)
			return

		if (isDigit(key)) {
			const aux = attempts.slice()
			aux[row][col] = key
			setAttempts(aux)

			if (col < (numberSize - 1))
				setCol(c => c + 1)

			return
		}

		if (key === 'backspace') {
			if (attempts[row][col] !== '')
				return clear(col)

			clear(col - 1)

			if (col > 0)
				setCol(c => c - 1)

			return
		}

		if (key === 'enter') {
			try {
				const attemptInfo = validateAttempt(attempts[row].join(''), randomNumber)

				const auxColors = colors.slice()
				auxColors[row] = attemptInfo.colors.slice()
				setColors(auxColors)
				setInfo(attemptInfo)
				setHint(attemptInfo.hint)

				if (attemptInfo.hint !== '') { // Errou
					if (row === (maxAttempts - 1)) { // Não tem mais chances
						setGameOver(true)
						Alert.alert(`O número era ${randomNumber}`)
						saveMatch(maxAttempts + 1)
						return
					}

					// Continua tentando
					setRow(state => state + 1)
					setCol(0)
					return
				}

				// Acertou
				setGameOver(true)
				Alert.alert(victoryMessages[row])
				setCol(-1)
				saveMatch(row + 1)
			} catch (err: any) {
				Alert.alert(err.message)
			}
		}
	}

	return (
		<Background>
			{ showHints && <Text style={styles.hint}>Dica: {hint}</Text> }

			{
				attempts.map((attempt, i) => (
					<Row key={i}>
						{
							attempt.map((digit, j) => (
								<Pressable
									key={j}
									style={[
										styles.digitContainer,
										{
											width: Dimensions.get('screen').width / (numberSize + 1.5),
											height: Dimensions.get('screen').width / (numberSize + 1.5),
											borderBottomWidth: row === i && col === j ? 4 : 0,
											backgroundColor: colors[i][j] ? colors[i][j] :
												COLORS[row === i ? 'BLACK' : 'GRAY_900'],
										}
									]}
									onPress={() => {
										if (i === row)
											setCol(j)
									}}
								>
									<Text style={styles.digit}>{digit}</Text>
								</Pressable>
							))
						}
					</Row>
				))
			}

			{
				!gameOver ?
				<Keyboard onKeyPress={key => handleKeyPress(key)} matchInfo={info} /> :
				<Pressable onPress={initializeStates} style={styles.restartButton}>
					<Text style={styles.buttonText}>Jogar novamente</Text>
				</Pressable>
			}
		</Background>
	)
}

const styles = StyleSheet.create({
	hint: {
		color: COLORS.WHITE,
		fontFamily: FONT_FAMILY.SEMI_BOLD,
		fontSize: FONT_SIZE.MD,
		textAlign: 'center',
		paddingBottom: 8
	},

	digitContainer: {
		borderRadius: 8,
		justifyContent: 'center',
		marginHorizontal: 4,
		borderBottomColor: COLORS.GRAY_500,
	},

	digit: {
		color: COLORS.WHITE,
		textAlign: 'center',
		fontFamily: FONT_FAMILY.SEMI_BOLD,
		fontSize: FONT_SIZE.MD,
	},

	restartButton: {
		backgroundColor: COLORS.BLUE,
		padding: 16,
		borderRadius: 8,
		margin: 32
	},

	buttonText: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.SEMI_BOLD,
		textAlign: 'center'
	}
})
