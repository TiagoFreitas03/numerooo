import { format } from "date-fns"

interface IMatch {
	result: 'V' | 'D'
	attempts: number
}

interface ILocalStats {
	matches: IMatch[]
	lastMatch: Date
}

const STATS_KEY = 'stats'

function readLocalStorage() {
	const localStats = localStorage.getItem(STATS_KEY)

	if (!localStats)
		return undefined

	return JSON.parse(localStats) as ILocalStats
}

export function saveMatch({ result, attempts }: IMatch) {
	if (attempts > 6)
		result = 'D'

	const lastMatch = new Date()

	let stats = readLocalStorage()

	if (!stats)
		stats = { matches: [], lastMatch }

	stats.matches.push({ result, attempts })
	stats.lastMatch = lastMatch

	localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

export function getLocalStats() {
	const stats = readLocalStorage()

	if (!stats)
		return undefined

	const { matches, lastMatch } = stats

	const numberOfMatches = matches.length
	const victories = matches.filter(m => m.result === 'V').length

	const totalAttempts = matches.reduce((previous, match) => previous + match.attempts, 0)
	const averageAttempts = ((totalAttempts) / matches.length).toFixed(2)

	matches.reverse()
	let currentWinStreak = 0

	for (let i = 0; i < matches.length; i++)
		if (matches[i].result === 'V')
			currentWinStreak++
		else
			break


	const perAttempts: number[] = Array.from({ length: 7 }).map(_ => 0)

	for (let i = 0; i < matches.length; i++) {
		const index = matches[i].result === 'V' ? matches[i].attempts - 1 : 6
		perAttempts[index]++
	}

	return {
		numberOfMatches,
		victories,
		averageAttempts,
		currentWinStreak,
		perAttempts,
		lastMatch: format(new Date(lastMatch), "dd/MM/yyyy 'às' HH:mm:ss")
	}
}