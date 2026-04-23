import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./InertiaPages/**/*.jsx', { eager: true })
    return pages[`./InertiaPages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App {...props} />
        </QueryClientProvider>
      </StrictMode>
    )
  },
})
