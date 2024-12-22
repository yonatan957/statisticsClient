import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'

export const socket = io(`${import.meta.env.VITE_BASE_URL}`)

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
)
