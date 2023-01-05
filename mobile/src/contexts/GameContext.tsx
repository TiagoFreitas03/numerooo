import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

/** Partida salva no armazenamento local */
interface Match {
	/** Resultado (Vitória ou Derrota) */
	result: 'V' | 'D'
	/** Número de tentativas usadas */
	attempts: number
	/** Tamanho do número na partida */
	numberSize: number
	/** Indica se usou dicas ou não */
	usedHints: boolean
}


/** Propriedades do contexto */
interface ContextProps {
	/** ELementos filhos */
	children: ReactNode
}

/** Dados do contexto do jogo */
interface GameContextData {
	/** Tamanho do número para ser adivinhado (quantidade de casas) */
	numberSize: number
	/** Indica se as dicas (maior/menor) serão exibidas */
	showHints: boolean
	/** Máximo de tentativas por partida (de acordo com o tamanho do número) */
	maxAttempts: number
	/** Estatísticas das partidas jogadas */
	matches: Match[]
	/** Função para salvar configurações de dificuldade */
	saveSettings: (size: number, hints: boolean) => Promise<void>
	/** Salva o resultado de uma partida localmente */
	saveMatch: (attempts: number) => Promise<void>
}

/** Contexto do jogo */
const GameContext = createContext({} as GameContextData)

/** Provedor do contexto do joog */
export function GameContextProvider({ children }: ContextProps) {
	const [numberSize, setNumberSize] = useState(5)
	const [maxAttempts, setMaxAttempts] = useState(6)
	const [showHints, setShowHints] = useState(true)
	const [matches, setMatches] = useState<Match[]>([])

	useEffect(() => {
		/** Carrega configurações e histórico de partidas */
		async function loadLocalData() {
			/** Configurações salvas localmente */
			const localSettings = await SecureStore.getItemAsync('numerooo_settings')

			if (localSettings) {
				const parsedSettings = JSON.parse(localSettings)

				setNumberSize(parsedSettings.numberSize)
				setShowHints(parsedSettings.showHints)
			}

			/** Partidas salvas localmente */
			const localMatches = await SecureStore.getItemAsync('numerooo_matches')

			if (localMatches)
				setMatches(JSON.parse(localMatches))
		}

		loadLocalData()
	}, [])

	useEffect(() => {
		setMaxAttempts(numberSize + 1)
	}, [numberSize])

	async function saveSettings(size: number, hints: boolean) {
		const settings = { numberSize: size, showHints: hints }
		await SecureStore.setItemAsync('numerooo_settings', JSON.stringify(settings))

		setNumberSize(size)
		setShowHints(hints)
	}

	async function saveMatch(attempts: number) {
		const result = (attempts > maxAttempts) ? 'D' : 'V'

		const matchesCopy = matches.slice()

		matchesCopy.push({
			result,
			attempts,
			numberSize,
			usedHints: showHints
		})

		await SecureStore.setItemAsync('numerooo_matches', JSON.stringify(matchesCopy))
		setMatches(matchesCopy)
	}

	return (
		<GameContext.Provider value={{
			numberSize,
			showHints,
			maxAttempts,
			matches,
			saveSettings,
			saveMatch
		}}>
			{ children }
		</GameContext.Provider>
	)
}

/** Hook para usar o contexto do jogo */
export const useGame = () => useContext(GameContext)
