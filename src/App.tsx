import {RouterProvider} from 'react-router-dom'
import {JobProvider} from './contexts/JobFlow'
import {router} from './routes'

export function App() {
  return (
    <JobProvider>
      <RouterProvider router={router} />
    </JobProvider>
  )
}
