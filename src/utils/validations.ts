export function isNumber(variable: any) {
	return !isNaN(variable)
}

export function isNumberValid(variable: any) {
	if (isNaN(variable))
		return false

	const num = Number(variable)

	return (num >= 10000 && num <= 99999)
}