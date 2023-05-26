import React, {useState} from 'react'
import {Job} from '../entities/job'

interface JobData {
  job?: Job
  setJob: (job: Job) => void
}

interface Props {
  children: any
}

export const JobContext = React.createContext<JobData>({
  job: {
    durationInHours: 0,
    employeeSize: 0,
    endAt: new Date(),
    startAt: new Date(),
    epis: [],
    name: '',
  },
  setJob: () => {
    return
  },
})

export const JobProvider: React.FC<Props> = ({children}) => {
  const [job, setJob] = useState<Job>()

  function handleSetjob(job: Job) {
    setJob(job)
  }

  return (
    <JobContext.Provider
      value={{
        setJob: handleSetjob,
        job,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}
