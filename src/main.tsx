import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'react-tooltip/dist/react-tooltip.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.tsx'

import { EditNoteProvider } from './context/EditNoteProvider.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <Router>
      <AuthProvider>
        <EditNoteProvider>
          <App />
        </EditNoteProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
