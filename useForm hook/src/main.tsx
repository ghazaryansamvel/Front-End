import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Page } from './page/index.tsx'

const router = createBrowserRouter([
  {
    path: "",
    element: <Page />
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}>
  </RouterProvider>
)
