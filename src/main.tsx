import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>
if (root.dataset.prerenderPath === window.location.pathname) hydrateRoot(root, app)
else { root.replaceChildren(); createRoot(root).render(app) }
