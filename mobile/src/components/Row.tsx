import { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

/** propriedades da linha */
interface RowProps {
	/** elementos filhos da linha */
	children: ReactNode
}

/** componente linha */
export function Row({ children }: RowProps) {
	return (
		<View style={styles.row}>
			{ children }
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 4,
	},
})
