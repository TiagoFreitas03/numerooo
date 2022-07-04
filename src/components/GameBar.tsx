import { useEffect, useState } from "react"

import { IconButton } from "./IconButton"
import { Help } from "./Help"
import { Stats } from './Stats'

import { getLocalStats } from "../utils/stats"
import { IStats } from "../utils/interfaces"

interface IGameBarProps {
	isGameOver: boolean
}

export function GameBar({ isGameOver }: IGameBarProps) {
	const [stats, setStats] = useState<IStats>()

	useEffect(() => {
		const localStats = getLocalStats()
		setStats(localStats)

		if (isGameOver) {
			const statsModalBtn = document.getElementById('btn-stats-modal')

			if (statsModalBtn)
				statsModalBtn.click()
		}
	}, [isGameOver])

	return (
		<>
			<div className='row mt-1'>
				<div className='col-lg-8 col-md-10 mx-auto justify-content-between d-flex'>
					<IconButton icon='question' data-bs-toggle="modal" data-bs-target="#help-modal" />

					<h1 className='mt-1 fs-3 fw-bold'>Numerooo</h1>

					<IconButton
						icon='chart-column'
						data-bs-toggle="modal"
						data-bs-target="#stats-modal"
						id="btn-stats-modal"
					/>
				</div>
			</div>

			<div id='modals'>
				<Help />
				<Stats data={stats} />
			</div>
		</>
	)
}