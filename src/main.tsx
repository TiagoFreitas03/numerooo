import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { AlertContextProvider } from './contexts/AlertContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </React.StrictMode>
)