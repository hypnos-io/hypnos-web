import {createBrowserRouter} from 'react-router-dom'
import {CamConfigPage} from './pages/CamConfigPage'
import {CamPanelPage} from './pages/CamPanelPage'
import {camPanelLoader} from './pages/CamPanelPage/camPanelLoader'
import DetectionPage from './pages/DetectionPage'
import ProcessPage from './pages/ProcessPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

export const router = createBrowserRouter([
  {
    path: '/detection',
    element: <DetectionPage />,
  },
  {
    path: '/process',
    element: <ProcessPage />
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
    path: '/signUp',
    element: <SignUpPage/>,
  }
])
