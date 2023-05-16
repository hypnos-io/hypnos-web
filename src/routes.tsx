import {createBrowserRouter} from 'react-router-dom'
import DetectionPage from './pages/DetectionPage'
import LoginPage from  './pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <DetectionPage />,
  },
  {
    path: '/',
    element: <LoginPage />,
  }
])
