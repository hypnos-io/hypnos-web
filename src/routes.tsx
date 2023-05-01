import {createBrowserRouter} from 'react-router-dom'
import DetectionPage from './pages/DetectionPage'
import CamsPage from './pages/CamsPage/CamsPage'
import React from 'react'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DetectionPage />,
  },
  {
    path: '/image-capture',
    element: <CamsPage />,
  },
])
