import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import ProcessList from '../../components/ProcessList'

import './style.css'
import { Process } from '../../entities/process'
import JobForms from '../../components/JobForms'

const ProcessPage: React.FC = () => {
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null);

  function renderPage() {
    if (currentPage === 0) {
      return (
        <ProcessList setCurrentPage={setCurrentPage} setCurrentProcess={setCurrentProcess}></ProcessList>
      );
    } else if (currentPage === 1) {
      return (
        <JobForms process={currentProcess!} setCurrentPage={setCurrentPage}></JobForms>
      );
    } 
    // else if (currentPage === 2) {
    //   return (
    //      <Exemplo setCurrentPage={setCurrentPage}></Exemplo>
    //   );
    // }
  }

  useEffect(() => {
    setIsAddingJob(currentPage !== 0);
  }, [currentPage]);

  return (
    <div className={isAddingJob ? "processPage adding__job" : "processPage"}>
      <Sidebar></Sidebar>
      {renderPage()}
    </div>
  )
}

export default ProcessPage;
