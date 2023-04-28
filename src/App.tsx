import {RouterProvider} from 'react-router-dom'
import {router} from './routes'
import React from 'react'

export function App() {
  return <RouterProvider router={router} />
}
