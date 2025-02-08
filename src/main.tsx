import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/elements/Navbar.tsx'
import { BrowserRouter as Router } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Router>
      <Navbar />
      <App />
    </Router>
  </StrictMode>,
)
