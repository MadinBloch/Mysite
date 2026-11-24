import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './fonts.css'
import './index.css'
import './portfolio.css'

const root = document.getElementById('root')
const path = window.location.pathname.replace(/\/+$/, '') || '/'

function start(Destinations) {
  const app = <React.StrictMode><BrowserRouter><App Destinations={Destinations} /></BrowserRouter></React.StrictMode>
  // Some legacy fragments redirect and album queries select markup the server cannot see.
  if (root.dataset.page === path && !window.location.search && !window.location.hash) hydrateRoot(root, app)
  else createRoot(root).render(app)
}

if (path === '/') start()
else import('./DestinationRoutes').then(module => start(module.default))
