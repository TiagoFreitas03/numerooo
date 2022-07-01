import { useState, useEffect } from 'react'

import { IAttemptInfo } from '../utils/interfaces'

interface IKeyProps {
	icon: string
	keyName?: string
	width?: number
	color?: 'green' | 'orange'
}

interface IKeyboardProps {
	onClickKey: (key: string) => void
	attemptInfo: IAttemptInfo
}

export function Keyboard({ onClickKey, attemptInfo }: IKeyboardProps) {
	const [greenKeys, setGreenKeys] = useState<number[]>([])
	const [orangeKeys, setOrangeKeys] = useState<number[]>([])
	const [disabledKeys, setDisabledKeys] = useState<number[]>([])

	useEffect(() => {
		const { correctPos, incorrectPos, notInNumber } = attemptInfo

		let auxGreen = correctPos.filter(n => !greenKeys.includes(n))
		auxGreen = [...greenKeys, ...auxGreen]
		setGreenKeys(auxGreen)

		let auxOrange = incorrectPos.filter(n => !orangeKeys.includes(n))
		auxOrange = [...orangeKeys, ...auxOrange]
		setOrangeKeys(auxOrange)

		let auxDisabled = notInNumber.filter(n => {
			return !disabledKeys.includes(n) && !auxGreen.includes(n) && !auxOrange.includes(n)
		})
		auxDisabled = [...disabledKeys, ...auxDisabled]
		setDisabledKeys(auxDisabled)
	}, [attemptInfo])

	function Key({ icon, width, keyName, color }: IKeyProps) {
		let classes = ' col btn piece border p-0 '

		if (color)
			classes += ` bg-${color} `

		return (
			<button
				className={classes}
				style={{ height: '48px', width: `${width ?? 48}px` }}
				onClick={() => onClickKey(keyName ?? icon)}
				disabled={disabledKeys.includes(Number(icon))}
			>
				<i className={`fas fa-${icon}`} />
			</button>
		)
	}

	return (
		<div className="mb-3">
			<div className="row mb-2 justify-content-center">
				<div className="col-lg-1 col-sm-2 col-3 p-1 justify-content-end d-flex">
					<Key icon="delete-left" width={50} keyName={'Backspace'} />
				</div>

				<div className="col-lg-1 col-sm-2 col-3 p-1 justify-content-start d-flex">
					<Key icon="arrow-right-to-bracket" width={50} keyName={'Enter'} />
				</div>
			</div>

			<div className="row justify-content-center text-center">
				{[[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]].map((row, index) => {
					return <div key={index} className="col-12">
						{row.map((num) => <Key
							key={num}
							icon={num.toString()}
							color={greenKeys.includes(num) ? 'green' :
								orangeKeys.includes(num) ? 'orange' : undefined}
						/>)}
					</div>
				})}
			</div>
		</div>
	)
}