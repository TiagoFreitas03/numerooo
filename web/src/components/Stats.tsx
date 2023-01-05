import { BarChart } from './BarChart'
import { SocialMedia } from './SocialMedia'
import { IStats } from '../utils/interfaces'

interface IStatsProps {
	data?: IStats
}

export function Stats({ data }: IStatsProps) {
	return (
		<div className="modal fade" id="stats-modal">
			<div className="modal-dialog modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title text-uppercase fs-3 fw-bold m-0 pt-2">Estatísticas</h4>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
					</div>

					<div className="modal-body pt-4 px-4">
						{data ?
							(
								<div className="row text-center">
									<div className="col">
										<p className='fs-3 fw-bold m-0'>{data.numberOfMatches}</p>
										<p className='my-2'>jogos</p>
									</div>

									<div className="col">
										<p className='fs-3 fw-bold m-0'>{data.victories}</p>
										<p className='my-2'>vitórias</p>
									</div>

									<div className="col">
										<p className='fs-3 fw-bold m-0'>{data.averageAttempts}</p>
										<p>média de<br />tentativas</p>
									</div>

									<div className="col">
										<p className='fs-3 fw-bold m-0'>{data.currentWinStreak}</p>
										<p>sequência<br />atual</p>
									</div>

									<div className="col-12 mt-2">
										<p className='m-0'>Distribuição de Tentativas</p>
										<BarChart data={data.perAttempts} />
									</div>

									<p>último jogo: {data.lastMatch}</p>
								</div>
							) : <p>Você ainda não possui estatísticas.</p>}

						<button className="btn bg-blue" onClick={() => window.location.reload()}>
							Jogar novamente
						</button>
					</div>

					<div className="modal-footer">
						<div className='mt-3 fs-5'>
							<a href="https://github.com/TiagoFreitas03/numerooo" className="link me-2" target="_blank">
								<i className='fas fa-code' />
							</a>

							<SocialMedia link='instagram.com/tiago_ffaria' icon='instagram' />
							<SocialMedia link='facebook.com/tiago.freitas.752487' icon='facebook' />
							<SocialMedia link='twitter.com/TigasFaria' icon='twitter' />
							<SocialMedia link='github.com/TiagoFreitas03' icon='github' />
							<SocialMedia link='linkedin.com/in/tiago-freitas-faria' icon='linkedin' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}