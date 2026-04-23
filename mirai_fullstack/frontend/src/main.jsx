import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient } from './api/queryClient'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>

      {/*
        ReactQueryDevtools renders a floating panel in development
        (automatically excluded from production builds).
        Open with the TanStack logo button in the bottom-left corner.
      */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)

/**
 * Audit fix §1.4: SEO Prerendering Trigger
 * 
 * Tells the vite-plugin-prerender that the app has successfully 
 * hydrated and is ready to be 'snapshotted' into static HTML.
 */
requestAnimationFrame(() => {
  document.dispatchEvent(new Event('custom-render-trigger'))
})
