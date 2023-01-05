import { useMemo } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { Background } from '../components/Background'
import { Row } from '../components/Row'
import { useGame } from '../contexts/GameContext'
import { COLORS, FONT_SIZE, FONT_FAMILY } from '../theme'

export function Statistics() {
	const { matches } = useGame()

	const stats = useMemo(() => {
		const numberOfMatches = matches.length
		const victories = matches.filter(m => m.result === 'V').length

		const totalAttempts = matches.reduce((previous, match) => previous + match.attempts, 0)
		let averageAttempts = '0.00'

		if (matches.length)
			averageAttempts = ((totalAttempts) / matches.length).toFixed(2)

		let currentWinStreak = 0

		for (let i = matches.length - 1; i >= 0; i--)
			if (matches[i].result === 'V')
				currentWinStreak++
			else
				break

			return {
				numberOfMatches,
				victories,
				averageAttempts,
				currentWinStreak
			}
	}, [matches])

	return (
		<Background>
			<Text style={styles.title}>Minhas estatísticas</Text>

			<Row>
				<View style={styles.infoContainer}>
					<Text style={styles.number}>{stats.numberOfMatches}</Text>
					<Text style={styles.label}>Partidas</Text>
				</View>

				<View style={styles.infoContainer}>
					<Text style={styles.number}>{stats.victories}</Text>
					<Text style={styles.label}>Vitórias</Text>
				</View>
			</Row>

			<Row>
				<View style={styles.infoContainer}>
					<Text style={styles.number}>{stats.averageAttempts}</Text>
					<Text style={styles.label}>Média</Text>
				</View>

				<View style={styles.infoContainer}>
					<Text style={styles.number}>{stats.currentWinStreak}</Text>
					<Text style={styles.label}>Sequência atual</Text>
				</View>
			</Row>
		</Background>
	)
}

const styles = StyleSheet.create({
	title: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZE.LG,
		fontFamily: FONT_FAMILY.SEMI_BOLD,
		paddingTop: 8
	},

	infoContainer: {
		width: '50%',
		marginVertical: 16
	},

	number: {
		color: COLORS.WHITE,
		fontSize: 32,
		fontFamily: FONT_FAMILY.BOLD,
		paddingVertical: 16,
		textAlign: 'center'
	},

	label: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZE.SM,
		fontFamily: FONT_FAMILY.REGULAR,
		marginBottom: 16,
		textAlign: 'center'
	}
})
