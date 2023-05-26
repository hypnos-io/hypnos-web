import React, {useEffect, useState} from 'react'
import ProcessList from '../../components/ProcessList'
import Sidebar from '../../components/Sidebar'

import {JobEmployeesTable} from '../../components/JobEmployeesTable'
import JobForms from '../../components/JobForms'
import JobHeader from '../../components/JobForms/JobHeader'
import WorkstationSynchronization from '../../components/WorkstationSynchronization'
import {JobProvider} from '../../contexts/JobFlow'
import {Process} from '../../entities/process'
import './style.css'

const ProcessPage: React.FC = () => {
  const [isAddingJob, setIsAddingJob] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null)

  function renderPage() {
    if (currentPage === 0) {
      return (
        <ProcessList
          setCurrentPage={setCurrentPage}
          setCurrentProcess={setCurrentProcess}
        ></ProcessList>
      )
    } else if (currentPage === 1) {
      return (
        <JobForms
          process={currentProcess!}
          setCurrentPage={setCurrentPage}
        ></JobForms>
      )
    } else if (currentPage === 2) {
      return (
        <div className="job-step-2">
          <JobHeader
            process={currentProcess}
            setCurrentPage={setCurrentPage}
            jobScreenStep={2}
          />
          <JobEmployeesTable setCurrentPage={setCurrentPage} />
        </div>
      )
    } else if (currentPage === 3) {
      return (
        <WorkstationSynchronization
          process={currentProcess!}
          setCurrentPage={setCurrentPage}
          jobScreenStep={3}
        ></WorkstationSynchronization>
      )
    }
  }

  useEffect(() => {
    setIsAddingJob(currentPage !== 0)
  }, [currentPage])

  return (
    <JobProvider>
      <div className={isAddingJob ? 'processPage adding__job' : 'processPage'}>
        <Sidebar></Sidebar>
        {renderPage()}
      </div>
    </JobProvider>
  )
}

export default ProcessPage
