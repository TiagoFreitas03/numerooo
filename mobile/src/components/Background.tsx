import { ReactNode } from "react"
import { ScrollView, StyleSheet } from 'react-native'
import { COLORS } from "../theme"

/** Propriedades do fundo */
interface BackgroundProps {
	/** Elementos filhos */
	children: ReactNode
}

/** Fundo padrão das telas */
export function Background({ children }: BackgroundProps) {
	return (
		<ScrollView style={styles.container}>
			{ children }
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.GRAY_700,
		paddingTop: 8,
		paddingHorizontal: 16
	}
})
