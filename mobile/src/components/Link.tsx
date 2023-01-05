import { useNavigation } from '@react-navigation/native'

import { Button, ButtonProps } from "./Button"

/** Propriedades do botão para mudar de tela */
interface LinkProps extends ButtonProps {
	url: 'game' | 'help' | 'settings' | 'statistics'
}

/** Botão para mudar de tela */
export function Link({ url, ...rest }: LinkProps) {
	const navigation = useNavigation()

	return (
		<Button
			{...rest}
			onPress={() => {
				navigation.navigate(url)
			}}
		/>
	)
}
