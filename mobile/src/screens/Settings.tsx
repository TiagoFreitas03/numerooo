import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import Spinner from 'react-native-input-spinner'

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'
import { useGame } from '../contexts/GameContext'
import { Button } from '../components/Button'
import { Background } from '../components/Background'

/** Tela de configurações do jogo */
export function Settings() {
	const navigation = useNavigation()
	const { numberSize, showHints, saveSettings } = useGame()

	const [size, setSize] = useState(numberSize)
	const [hints, setHints] = useState(showHints)

	return (
		<Background>
			<Text style={styles.title}>CONFIGURAÇÕES</Text>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Tamanho do número</Text>

				<View style={{}}>
					<Spinner
						min={4}
						max={6}
						step={1}
						color='#fff'
						value={size}
						onChange={(value) => setSize(Number(value))}
						style={{ marginVertical: 10 }}
						editable={false}
						buttonStyle={{ backgroundColor: COLORS.BLUE, borderRadius: 8 }}
						textColor={COLORS.WHITE}
						buttonFontSize={FONT_SIZE.MD}
						fontSize={FONT_SIZE.MD}
						fontFamily={FONT_FAMILY.REGULAR}
					/>
				</View>
			</View>

			<View style={styles.checkboxContainer}>
				<Checkbox
					style={styles.checkbox}
					value={hints}
					onValueChange={setHints}
					color={hints ? COLORS.BLUE : COLORS.GRAY_100}
				/>

				<Text style={styles.label}>Mostrar dicas</Text>
			</View>

			<Button
				text='Salvar'
				onPress={() => {
					saveSettings(size, hints)
					navigation.navigate('home')
				}}
			/>
		</Background>
	)
}

const styles = StyleSheet.create({
	title: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZE.LG,
		fontFamily: FONT_FAMILY.SEMI_BOLD
	},

	label: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.REGULAR
	},

	inputContainer: {
		marginVertical: 30
	},

	checkboxContainer: {
		marginVertical: 30,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},

	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 8,
		marginRight: 16,
		padding: 20
	}
})
