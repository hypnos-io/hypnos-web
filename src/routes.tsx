import {createBrowserRouter} from 'react-router-dom'
import DetectionPage from './pages/DetectionPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DetectionPage />,
  },
])
