import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

export function renderPage(pathname: string) {
  return renderToString(<StaticRouter location={pathname}><App /></StaticRouter>)
}
