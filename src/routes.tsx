import {createBrowserRouter} from 'react-router-dom'
import DetectionPage from './pages/DetectionPage'
import React from 'react'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DetectionPage />,
  },
])
