import { StyleSheet, View, Text } from "react-native"

import { Link } from "../components/Link"
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"

/** Tela inicial do aplicativo */
export function Home() {
	return (
		<View style={styles.container}>
			<View></View>

			<View>
				<Link text='Iniciar' icon='play' url='game' />

				<Link text='Configurações' icon='settings' url='settings' />

				<Link text='Ajuda' icon='help' url='help' />

				<Link text='Estatísticas' icon='bar-chart' url='statistics' />
			</View>

			<Text style={styles.footer}>Desenvolvido por Tiago Faria</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: COLORS.GRAY_700,
		justifyContent: 'space-between',
	},

	footer: {
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SM,
		color: COLORS.GRAY_100,
		textAlign: 'center',
		marginBottom: 16
	}
})
