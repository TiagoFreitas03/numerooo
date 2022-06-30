import { useEffect, useState } from 'react'

import './styles/global.css'
import './styles/background.css'

import { GameBar } from "./components/GameBar"
import { Keyboard } from './components/Keyboard'
import { Piece } from './components/Piece'

import { useAlert } from './contexts/AlertContext'
import { isNumber, isNumberValid } from './utils/validations'

export function App() {
	const { showAlert } = useAlert()

	const [randomNumber, setRandomNumber] = useState(0)
	const [attempts, setAttempts] = useState<string[][]>(
		Array.from({ length: 6 }).map(() => Array.from({ length: 5 }).map(() => ''))
	)
	const [currentRow, setCurrentRow] = useState(0)
	const [currentPos, setCurrentPos] = useState(0)

	useEffect(() => { // número entre 10000 e 99999
		const num = Math.floor(Math.random()  * (100000 - 10000) + 10000)
		setRandomNumber(num)
	}, [])

	document.onkeydown = (event) => updateTyped(event.key)

	const clearPos = (pos: number) => {
		if (pos > -1 && pos <= 4) {
			const aux = attempts.slice()
			aux[currentRow][pos] = ''
			setAttempts(aux)
		}
	}

	const decrementPos = () => {
		if (currentPos > 0)
			setCurrentPos(state => state - 1)
	}

	const incrementPos = () => {
		if (currentPos < 4)
			setCurrentPos(state => state + 1)
	}

	function updateTyped(key: string) {
		const setTyped = (pos: number, character: string) => {
			const aux = attempts.slice()
			aux[currentRow][pos] = character.charAt(0).toUpperCase()
			setAttempts(aux)
		}

		if (!isNumber(key)) {
			if (key === 'delete-left' || key === 'Backspace') {
				if (attempts[currentRow][currentPos] === '') {
					clearPos(currentPos - 1)
					decrementPos()
				}
				else clearPos(currentPos)
			}
			else if (key === 'arrow-right-to-bracket' || key === 'Enter') {
				if (isNumberValid(attempts[currentRow].join(''))) {
					setCurrentRow(state => state + 1)
					setCurrentPos(0)
				}
				else showAlert({ color: 'red', message: 'Número inválido' })
			}

			switch (key) {
				case 'ArrowLeft': decrementPos(); break;
				case 'ArrowRight': incrementPos(); break;
			}

			return
		}

		if (currentPos < 5) {
			setTyped(currentPos, key)
			incrementPos()
		}
	}

	return (
		<div className="container pt-4">
			<GameBar />

			<div className='my-4'>
				{attempts.map((row, i) => {
					return <div className="row justify-content-center text-center" key={i}>
						{row.map((num, j) => {
							return <Piece
								key={j}
								text={num}
								color={currentRow === i ? 'black' : 'grey-900'}
								style={{
									borderBottom: currentPos === j && currentRow === i ?
										'4px solid var(--grey-500)' : 'none',
									cursor: 'pointer',
									height: '48px',
									width: '48px',
									fontSize: '18px'
								}}
								onClick={() => {
									if (i === currentRow)
										setCurrentPos(j)
								}}
							/>
						})}
					</div>
				})}
			</div>

			<Keyboard onClickKey={(key) => updateTyped(key)} />
		</div>
	)
}