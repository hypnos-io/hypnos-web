import {useEffect, useState} from 'react'

import './style.css'

import arrowIcon from '../../assets/img/ProcessList/Icon ionic-ios-arrow-down@2x.png'
import whitePencilIcon from '../../assets/img/ProcessList/Icon material-edit@2x.png'

import {Job} from '../../../entities/job'
import {Process} from '../../../entities/process'
import {JobService} from '../../../services/job_service'
import {FetchAll} from '../../../use_cases/job/FetchAll'
import ProcessTable from './ProcessTable'
import UpdateProcessModal from './UpdateProcessModal'

interface ProcessDropDownProps {
  processProp: Process
  setCurrentPage: (page: number) => void
  setCurrentProcess: (process: Process) => void
}

function ProcessDropDown({
  processProp,
  setCurrentPage,
  setCurrentProcess,
}: ProcessDropDownProps) {
  const [isActive, setIsActive] = useState(false)
  const [process, setProcess] = useState<Process>(processProp)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function fetchJobs() {
    const fetchAllUC = new FetchAll(new JobService())
    const allJobs = await fetchAllUC.execute(processProp)
    setJobs(allJobs)
  }

  function onClickProcessTable() {
    setIsActive(!isActive)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="process__dropdown">
      <UpdateProcessModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        processProp={processProp}
      ></UpdateProcessModal>

      <div className={isActive ? 'process__header active' : 'process__header'}>
        <div className="process__header__title">
          <h1>{process.name}</h1>
          <img
            src={whitePencilIcon}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </div>
        <img className="arrow" src={arrowIcon} onClick={onClickProcessTable} />
      </div>

      <div>
        {isActive && (
          <ProcessTable
            process={processProp}
            jobs={jobs}
            setCurrentPage={setCurrentPage}
            setCurrentProcess={setCurrentProcess}
          ></ProcessTable>
        )}
      </div>
    </div>
  )
}

export default ProcessDropDown
