import { View, StyleSheet } from 'react-native'

import { Row } from './Row'
import { Key } from './Key'
import { MatchInfo } from '../interfaces/MatchInfo'
import { useEffect, useState } from 'react'

/** Propriedades do teclado */
interface KeyboardProps {
	/** Informações da partida */
	matchInfo: MatchInfo
	/** Evento de tecla pressionada */
	onKeyPress: (key: string) => void
}

/** Componente teclado */
export function Keyboard({ onKeyPress, matchInfo }: KeyboardProps) {
	const numberKeys = [
		['0', '1', '2', '3', '4'],
		['5', '6', '7', '8', '9']
	]

	const [green, setGreen] = useState<number[]>([])
	const [orange, setOrange] = useState<number[]>([])
	const [disabled, setDisabled] = useState<number[]>([])

	useEffect(() => {
		const { correct, incorrect, notInNumber } = matchInfo

		const auxGreen = [...green, ...correct.filter(n => !green.includes(n))]
		setGreen(auxGreen)

		const auxOrange = [...orange, ...incorrect.filter(n => !orange.includes(n))]
		setOrange(auxOrange)

		let auxDisabled = notInNumber.filter(n => {
			return !disabled.includes(n) && !auxGreen.includes(n) && !auxOrange.includes(n)
		})
		auxDisabled = [...disabled, ...auxDisabled]
		setDisabled(auxDisabled)
	}, [matchInfo])

	return (
		<View style={styles.container}>
			<Row>
				<Key icon='backspace' size={100} onPress={() => onKeyPress('backspace')} />
				<Key icon='enter' size={100} onPress={() => onKeyPress('enter')} />
			</Row>

			{
				numberKeys.map((row, index) => (
					<Row key={index}>
						{
							row.map(num => (
								<Key
									key={num}
									digit={num}
									color={
										green.includes(Number(num)) ? 'GREEN' :
										orange.includes(Number(num)) ? 'ORANGE' : undefined
									}
									onPress={() => onKeyPress(num)}
									disabled={disabled.includes(Number(num))}
								/>
							))
						}
					</Row>
				))
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 16
	}
})
