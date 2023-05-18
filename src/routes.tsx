import {createBrowserRouter} from 'react-router-dom'
import {CamConfigPage} from './pages/CamConfigPage'
import {CamPanelPage} from './pages/CamPanelPage'
import {camPanelLoader} from './pages/CamPanelPage/camPanelLoader'
import DetectionPage from './pages/DetectionPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <DetectionPage />,
  },
  {
    path: 'cameras',
    element: <CamConfigPage />,
  },
  {
    path: 'cameras/:sectorId',
    element: <CamPanelPage />,
    loader: camPanelLoader,
  },
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: 'signUp',
    element: <SignUpPage/>,
  }

])
