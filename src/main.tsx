import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import CamPage from './pages/CamPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <CamPage />
  </React.StrictMode>
)
