import { TouchableOpacityProps, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/Ionicons'

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'

/** Propriedades do botão para mudar de tela */
export interface ButtonProps extends TouchableOpacityProps {
	/** Texto do botão */
	text: string
	/** Ícone do botão */
	icon?: 'play' | 'settings' | 'help' | 'bar-chart'
}

/** Botão para mudar de tela */
export function Button({ text, icon, ...rest }: ButtonProps) {
	const navigation = useNavigation()

	return (
		<TouchableOpacity
			style={styles.button}
			activeOpacity={0.75}
			{...rest}
		>
			{ icon && <Icon name={icon} size={20} color={COLORS.GRAY_700} /> }

			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.BLUE,
		padding: 16,
		borderRadius: 12,
		marginVertical: 12,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: COLORS.GRAY_700,
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.SEMI_BOLD,
		textAlign: 'center',
		marginLeft: 8
	}
})
