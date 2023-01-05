import { View, Text, StyleSheet } from 'react-native'

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'

/** Cabeçalho */
export function Header() {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>Numerooo</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.GRAY_900,
		padding: 16,
	},

	title: {
		color: COLORS.WHITE,
		fontFamily: FONT_FAMILY.BOLD,
		fontSize: FONT_SIZE.LG,
		textAlign: 'center'
	},
})
