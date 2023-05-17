import {createBrowserRouter} from 'react-router-dom'
import DetectionPage from './pages/DetectionPage'
import ProcessPage from './pages/ProcessPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DetectionPage />,
  },
  {
    path: '/process',
    element: <ProcessPage />
  },
])
