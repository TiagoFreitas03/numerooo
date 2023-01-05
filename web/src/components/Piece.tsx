import { HTMLAttributes } from "react"

interface IPieceProps extends HTMLAttributes<HTMLSpanElement> {
	text: string
	color?: string
	border?: boolean
}

export function Piece({ text, color, border = false, ...rest }: IPieceProps) {
	let classes = 'd-inline-flex justify-content-center align-items-center text-uppercase piece '

	if (color)
		classes += ` bg-${color} `

	if (border)
		classes += ' border '

	return (
		<span className={classes} {...rest}>
			{text}
		</span>
	)
}