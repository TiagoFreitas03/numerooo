import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { COLORS } from '../theme'

/** Tela de carregamento */
export function Loading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator color='white' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.GRAY_700
	}
})
