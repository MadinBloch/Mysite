import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { pagePaths, getPageMeta } from './pageMeta'
export { portrait } from './portrait'
export { pagePaths }

export function renderPage(path) {
  const body = renderToString(<StaticRouter location={path}><App /></StaticRouter>)
  return { body, meta: getPageMeta(path) }
}
