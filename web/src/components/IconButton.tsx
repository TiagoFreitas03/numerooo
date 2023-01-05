import { ButtonHTMLAttributes } from "react"

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string
}

export function IconButton({ icon, ...rest }: IIconButtonProps) {
	return (
		<button
			className={`btn btn-outline-light fas fa-${icon} m-1 pt-2`}
			{...rest}
		/>
	)
}