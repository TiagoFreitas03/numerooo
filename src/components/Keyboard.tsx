interface IKeyProps {
	icon: string
	width?: number
}

interface IKeyboardProps {
	onClickKey: (key: string) => void
}

export function Keyboard({ onClickKey }: IKeyboardProps) {
	function Key({ icon, width }: IKeyProps) {
		return (
			<button
				className="col btn piece border p-0"
				style={{ height: '48px', width: `${width ?? 48}px` }}
				onClick={() => onClickKey(icon)}
			>
				<i className={`fas fa-${icon}`} />
			</button>
		)
	}

	return (
		<div className="mb-3">
			<div className="row mb-2 justify-content-center">
				<div className="col-lg-1 col-sm-2 col-3 p-1 justify-content-end d-flex">
					<Key icon="delete-left" width={50} />
				</div>

				<div className="col-lg-1 col-sm-2 col-3 p-1 justify-content-start d-flex">
					<Key icon="arrow-right-to-bracket" width={50} />
				</div>
			</div>

			<div className="row justify-content-center text-center">
				{[[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]].map((row, index) => {
					return <div key={index} className="col-12">
						{row.map((num) => <Key key={num} icon={num.toString()} />)}
					</div>
				})}
			</div>
		</div>
	)
}