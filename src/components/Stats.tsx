interface ISocialMediaProps {
	link: string
	icon: string
}

export function Stats() {
	function SocialMedia({ link, icon }: ISocialMediaProps) {
		return (
			<a
				target="_blank"
				href={`https://${link}`}
				className={`mx-2 mt-1 text-decoration-none fab fa-${icon} link`}
			/>
		)
	}

	return (
		<div className="modal fade" id="stats-modal">
			<div className="modal-dialog modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title text-uppercase fs-3 fw-bold pt-2">Estatísticas</h4>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
					</div>

					<div className="modal-body pt-4 px-4">
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