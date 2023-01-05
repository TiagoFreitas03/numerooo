import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { Background } from '../components/Background'

import { Row } from '../components/Row'
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'

/** Tela de ajuda sobre como jogar */
export function Help() {
	return (
		<Background>
			<Text style={styles.title}>COMO JOGAR</Text>

			<Text style={styles.text}>
				Descubra o número certo antes de acabarem as tentativas.
			</Text>

			<Text style={styles.text}>
				Depois de cada tentativa, as peças podem ser usadas como dicas para encontrar a solução.
			</Text>

			<Row>
				{
					[0, 2, 4, 6, 8].map(num =>
						<View style={{ padding: 4 }} key={num}>
							<View
								style={[
									styles.box, {
									backgroundColor: num === 2 ? COLORS.GREEN :
										num === 6 ? COLORS.ORANGE : COLORS.GRAY_700,
									borderWidth: 2,
									borderColor: COLORS.GRAY_900
								}]}
							>
								<Text style={styles.digit}>{num}</Text>
							</View>
						</View>
					)
				}
			</Row>

			<Text style={styles.text}>O digito 2 faz parte do número e está na posição correta.</Text>

			<Text style={styles.text}>O digito 6 faz parte do número, mas em outra posição.</Text>

			<Text style={styles.text}>Os outros digitos não fazem parte do número.</Text>

			<Text style={styles.text}>A cada tentativa, uma dica informa se é maior ou menor.</Text>

			<Text style={styles.text}>Os números podem possuir algarismos repetidos.</Text>
		</Background>
	)
}

const styles = StyleSheet.create({
	title: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZE.LG,
		fontFamily: FONT_FAMILY.SEMI_BOLD
	},

	text: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZE.SM,
		fontFamily: FONT_FAMILY.REGULAR,
		marginVertical: 8
	},

	box: {
		width: Dimensions.get('screen').width / 6.5,
		height: Dimensions.get('screen').width / 6.5,
		borderRadius: 8,
		justifyContent: 'center',
	},

	digit: {
		color: COLORS.WHITE,
		fontFamily: FONT_FAMILY.BOLD,
		fontSize: FONT_SIZE.LG,
		textAlign: 'center'
	}
})
