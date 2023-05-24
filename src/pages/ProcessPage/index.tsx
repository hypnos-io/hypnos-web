import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import ProcessList from '../../components/ProcessList'

import './style.css'
import { Process } from '../../entities/process'
import JobForms from '../../components/JobForms'

const ProcessPage: React.FC = () => {
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [process, setProcess] = useState<Process | null>(null);

  function addJobScreen(process: any) {
    setProcess(process);
    setIsAddingJob(!isAddingJob);
  }

  return (
    <div className={isAddingJob ? "processPage adding__job" : "processPage"}>
      <Sidebar></Sidebar>
      {isAddingJob ? <JobForms process={process} addJobScreen={addJobScreen}></JobForms> : <ProcessList addJobScreen={addJobScreen}></ProcessList>}
    </div>
  )
}

export default ProcessPage
