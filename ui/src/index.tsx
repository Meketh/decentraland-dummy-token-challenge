import { render } from 'react-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient'
import { RouterProvider } from 'react-router-dom'
import 'decentraland-ui/lib/styles.css'
import './index.css'
import { router } from './services/router'

render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </QueryClientProvider>,
  document.getElementById('root')
)
