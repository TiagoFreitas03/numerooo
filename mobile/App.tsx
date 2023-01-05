import { StatusBar } from 'react-native'
import {
	useFonts,
	Nunito_400Regular,
	Nunito_600SemiBold,
	Nunito_700Bold
} from '@expo-google-fonts/nunito'

import { Loading } from './src/screens/Loading'
import { Routes } from './src/Routes'
import { GameContextProvider } from './src/contexts/GameContext'

/** Aplicativo */
export default function App() {
	const [fontsLoaded] = useFonts({ Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold })

	if (!fontsLoaded)
		return <Loading />

	return (
		<GameContextProvider>
			<Routes />

			<StatusBar />
		</GameContextProvider>
	)
}
