import { Piece } from './Piece'

export function Help() {
	return (
		<div className="modal fade" id="help-modal">
			<div className="modal-dialog modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title text-uppercase fs-3 fw-bold pt-2">Como Jogar</h4>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
					</div>

					<div className="modal-body pt-4 px-4">
						<p>Descubra o número certo antes de acabarem as tentativas. Depois de cada tentativa,
							as peças podem ser usadas como dicas para encontrar a solução.</p>

						<div className="fs-5">
							{[0, 2, 4, 6, 8].map(num =>
								<Piece
									key={num}
									text={String(num)}
									color={num === 2 ? 'green' : num === 6 ? 'orange' : undefined }
									border={true}
								/>
							)}
						</div>

						<p className="my-3">O digito <Piece text={String(2)} color={'green'} /> faz parte do número e
							está na posição correta.</p>

						<p className="my-3">O digito <Piece text={String(6)} color={'orange'} /> faz parte do número,
							mas em outra posição.</p>

						<p>Os outros digitos não fazem parte do número.</p>
						<p>A cada tentativa, uma dica informa se número correto é maior ou menor.</p>
						<p>Os números podem possuir algarismos repetidos.</p>
					</div>
				</div>
			</div>
		</div>
	)
}