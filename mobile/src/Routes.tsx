import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Header } from './components/Header'

import { Home } from './screens/Home'
import { Game } from './screens/Game'
import { Help } from './screens/Help'
import { Settings } from './screens/Settings'
import { Statistics } from './screens/Statistics'

const { Navigator, Screen } = createNativeStackNavigator()

export function Routes() {
	return (
		<NavigationContainer>
			<Navigator
				screenOptions={{
					header: () => <Header />
				}}
			>
				<Screen name='home' component={Home} />

				<Screen name='game' component={Game} />

				<Screen name='help' component={Help} />

				<Screen name='settings' component={Settings} />

				<Screen name='statistics' component={Statistics} />
			</Navigator>
		</NavigationContainer>
	)
}