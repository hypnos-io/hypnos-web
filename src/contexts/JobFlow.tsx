import React, {useState} from 'react'
import {Employee} from '../entities/employee'
import {Job} from '../entities/job'

interface JobData {
  job?: Job
  employees: Employee[]
  setEmployees: (employees: Employee[]) => void
  setJob: (job: Job) => void
}

interface Props {
  children: React.ReactNode
}

export const JobContext = React.createContext<JobData>({
  setJob: () => {
    return
  },
  employees: [],
  setEmployees: () => {
    return
  },
})

export const JobProvider: React.FC<Props> = ({children}) => {
  const [job, setJob] = useState<Job>()
  const [employees, setEmployees] = useState<Employee[]>([])

  return (
    <JobContext.Provider
      value={{
        job,
        employees,
        setJob,
        setEmployees,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}
