import { IconButton } from "./IconButton"

import { Help } from "./Help"
import { Stats } from './Stats'

export function GameBar() {
	return (
		<>
			<div className='row mt-1'>
				<div className='col-lg-8 col-md-10 mx-auto justify-content-between d-flex'>
					<IconButton icon='question' data-bs-toggle="modal" data-bs-target="#help-modal" />

					<h1 className='mt-1 fs-3 fw-bold'>Numerooo</h1>

					<IconButton icon='chart-column' data-bs-toggle="modal" data-bs-target="#stats-modal" />
				</div>
			</div>

			<div id='modals'>
				<Help />
				<Stats />
			</div>
		</>
	)
}