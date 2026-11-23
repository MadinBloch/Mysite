import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './fonts.css'
import './index.css'
import './portfolio.css'

const root = document.getElementById('root')
const app = <React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>
const path = window.location.pathname.replace(/\/+$/, '') || '/'
// A fragment can open an early project or redirect a legacy URL. Album queries can select different markup.
if (root.dataset.page === path && !window.location.search && !window.location.hash) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
