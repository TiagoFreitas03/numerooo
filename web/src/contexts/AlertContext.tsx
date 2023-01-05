import { ReactNode, useState, createContext, useContext } from 'react'

interface IContextProps {
	children: ReactNode
}

interface IAlert {
	message: string
	color: 'red' | 'green' | 'blue'
}

interface IAlertContextProps {
	showAlert: (params: IAlert, timeout?: number) => void
}

const AlertContext = createContext({} as IAlertContextProps)

export function AlertContextProvider({ children }: IContextProps) {
	const [alert, setAlert] = useState<IAlert>()
	const [id, setId] = useState('')

	const showAlert = (params: IAlert, timeout: number = 3000) => {
		setAlert(undefined)

		const newId = String(new Date().getTime())
		setId(newId)

		setTimeout(() => { setAlert(params) }, 100)

		setTimeout(() => {
			if (document.getElementById(newId))
				setAlert(undefined)
		}, timeout)
	}

	return (
		<AlertContext.Provider value={{
			showAlert
		}}>
			<div className="position-fixed d-flex justify-content-center alert-container">
				{ alert &&
					<span className={`alert bg-${alert.color} py-2 text-center`} id={id}>
						<strong>{alert.message}</strong>
					</span>
				}
			</div>

			{children}
		</AlertContext.Provider>
	)
}

export const useAlert = () => {
	return useContext(AlertContext)
}