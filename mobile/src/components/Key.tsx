import { Pressable, Text, StyleSheet, Dimensions, PressableProps } from "react-native"
import Icon from '@expo/vector-icons/Ionicons'

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'

interface BaseProps extends PressableProps {
	size?: number
	color?: 'GREEN' | 'ORANGE'
}

interface NumberKeyProps extends BaseProps {
	digit: string
	icon?: undefined
}

interface IconKeyProps extends BaseProps {
	icon: 'backspace' | 'enter'
	digit?: undefined
}

type KeyProps = NumberKeyProps | IconKeyProps

export function Key({ icon, digit, size, color, ...rest }: KeyProps) {
	return (
		<Pressable
			style={[
				styles.container,
				{
					width: size ?? Dimensions.get('screen').width / 6,
					backgroundColor: COLORS[color ?? 'GRAY_700'],
					opacity: rest.disabled ? 0.5 : 1
				}
			]}
			{...rest}
		>
			{
				icon ?
					<Icon name={icon} size={24} color={COLORS.WHITE} /> :
					<Text style={styles.text}>{digit}</Text>
			}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		borderWidth: 2,
		borderColor: COLORS.GRAY_900,
		marginHorizontal: 4,
		justifyContent: 'center',
		alignItems: 'center',
		height: Dimensions.get('screen').width / 6,
	},

	text: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.SEMI_BOLD,
	}
})
