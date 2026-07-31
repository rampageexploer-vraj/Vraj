import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NavbarProvider } from './context/NavContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavbarProvider>
      <App />
    </NavbarProvider>
  </StrictMode>,
)
