import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import DetectionPage from './pages/DetectionPage'
import CamsPage from './pages/CamsPage/CamsPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from  './pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <DetectionPage />,
  },
  {
    path: '/image-capture',
    element: <CamsPage />,
  },
  {
    path: '/signUp',
    element: <SignUpPage />
  },
  {
    path: '/',
    element: <LoginPage />,
  }
])
