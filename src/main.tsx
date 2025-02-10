import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'react-tooltip/dist/react-tooltip.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <Router>
      <AuthProvider>
      <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
)
