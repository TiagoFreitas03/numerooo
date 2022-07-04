import { useState } from 'react'

import './styles/global.css'
import './styles/background.css'

import { GameBar } from "./components/GameBar"
import { Keyboard } from './components/Keyboard'
import { Piece } from './components/Piece'

import { useAlert } from './contexts/AlertContext'
import { isNumber, isNumberValid, validateAttempt } from './utils/validations'
import { saveMatch } from './utils/stats'
import { IAttemptInfo } from './utils/interfaces'

const ATTEMPTS = Array.from({ length: 6 }).map(() => Array.from({ length: 5 }).map(() => ''))
const ATTEMPT_INFO = { correctPos: [], incorrectPos: [], notInNumber: [] }
const VICTORY_MESSAGES = ['IMPOSSÍVEL', 'EXCEPCIONAL', 'UAU', 'PARABÉNS', 'MUITO BOM', 'UFA']

export function App() {
	const { showAlert } = useAlert()

	const [randomNumber] = useState(Math.floor(Math.random()  * (100000 - 10000) + 10000))
	const [attempts, setAttempts] = useState<string[][]>(ATTEMPTS)
	const [attemptInfo, setAttemptInfo] = useState<IAttemptInfo>(ATTEMPT_INFO)
	const [currentRow, setCurrentRow] = useState(0)
	const [currentPos, setCurrentPos] = useState(0)
	const [colors, setColors] = useState<string[][]>([[], [], [], [], [], []])
	const [hint, setHint] = useState('')
	const [gameOver, setGameOver] = useState(false)

	document.onkeydown = (event) => updateTyped(event.key)

	const clearPos = (pos: number) => {
		if (pos > -1 && pos <= 4) {
			const aux = attempts.slice()
			aux[currentRow][pos] = ''
			setAttempts(aux)
		}
	}

	const decrementPos = () => setCurrentPos(currentPos > 0 ? state => state - 1 : currentPos)
	const incrementPos = () => setCurrentPos(currentPos < 4 ? state => state + 1 : currentPos)

	function updateTyped(key: string) {
		if (gameOver)
			return

		if (isNumber(key)) {
			if (currentPos < 5) {
				const aux = attempts.slice()
				aux[currentRow][currentPos] = key
				setAttempts(aux)
				incrementPos()
			}

			return
		}

		if (key === 'Backspace') {
			if (attempts[currentRow][currentPos] === '') {
				clearPos(currentPos - 1)
				decrementPos()
			}
			else clearPos(currentPos)
		}
		else if (key === 'Enter') {
			const typed = attempts[currentRow].join('')

			if (isNumberValid(typed)) {
				const {
					correctPos, incorrectPos, notInNumber, attemptHint, attemptColors
				} = validateAttempt(typed, randomNumber)

				const auxColors = colors.slice()
				auxColors[currentRow] = attemptColors.slice()
				setColors(auxColors)
				setHint(attemptHint)
				setAttemptInfo({ correctPos, incorrectPos, notInNumber })

				if (attemptHint === '') { // Acertou
					setGameOver(true)
					showAlert({ color: 'blue', message: VICTORY_MESSAGES[currentRow] }, 5000)
					setCurrentPos(-1)
					saveMatch({ result: 'V', attempts: currentRow + 1 })
				} else if (currentRow === 5) { // Errou
					setGameOver(true)
					showAlert({ color: 'red', message: `O número era: ${randomNumber}` }, 8000)
					setCurrentPos(-1)
					saveMatch({ result: 'D', attempts: 6 })
				} else { // Continua
					setCurrentRow(state => state + 1)
					setCurrentPos(0)
				}
			}
			else showAlert({ color: 'red', message: 'Número inválido' })
		}
		else if (key === 'ArrowLeft') decrementPos()
		else if (key === 'ArrowRight') incrementPos()
	}

	return (
		<div className="container pt-3">
			<GameBar isGameOver={gameOver} />

			{hint !== '' && <div className="row text-center my-3">
				<span>Dica: {hint}</span>
			</div>}

			<div className='my-3'>
				{attempts.map((row, i) => {
					return <div className="row justify-content-center text-center" key={i}>
						{row.map((num, j) => {
							return <Piece
							key={j}
								text={num}
								color={colors[i][j] ? colors[i][j] : currentRow === i ? 'black' : 'grey-900'}
								style={{
									borderBottom: currentPos === j && currentRow === i ?
										'4px solid var(--grey-500)' : 'none',
									cursor: 'pointer',
									height: '48px',
									width: '48px',
									fontSize: '18px'
								}}
								onClick={() => {
									if (i === currentRow && !gameOver)
										setCurrentPos(j)
								}}
							/>
						})}
					</div>
				})}
			</div>

			<Keyboard onClickKey={(key) => updateTyped(key)} attemptInfo={attemptInfo} />
		</div>
	)
}