import { render } from 'react-dom'
import { App } from './components/App'
import { QueryProvider } from './providers/QueryProvider'
import 'decentraland-ui/lib/styles.css'

render(
  <QueryProvider>
    <App />
  </QueryProvider>,
  document.getElementById('root')
)
