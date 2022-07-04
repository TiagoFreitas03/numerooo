interface ISocialMediaProps {
	link: string
	icon: string
}

export function SocialMedia({ link, icon }: ISocialMediaProps) {
	return (
		<a
			target="_blank"
			href={`https://${link}`}
			className={`mx-2 mt-1 text-decoration-none fab fa-${icon} link`}
		/>
	)
}