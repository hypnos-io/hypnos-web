import {useEffect, useState} from 'react'

import './style.css'

import addProcessIcon from '../assets/img/ProcessList/Icon feather-plus-circle-white@2x.png'
import processIcon from '../assets/img/ProcessList/Icon ionic-ios-git-network@2x.png'

import ProcessDropDown from './ProcessDropDown'

import {Process} from '../../entities/process'
import {ProcessService} from '../../services/process_service'
import {FetchAll} from '../../use_cases/process/FetchAll'
import AddProcessModal from './AddProcessModal'

function ProcessList({setCurrentPage, setCurrentProcess}: any) {
  const [processes, setProcesses] = useState<Process[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function fetchAllProcesses() {
    const fetchAllUC = new FetchAll(new ProcessService())
    const allProcesses = await fetchAllUC.execute()
    setProcesses(allProcesses)
  }

  useEffect(() => {
    fetchAllProcesses()
  }, [])

  function renderProcess(process: Process, index: number) {
    return (
      <ProcessDropDown
        key={`${index}-${process._id}`}
        processProp={process}
        setCurrentPage={setCurrentPage}
        setCurrentProcess={setCurrentProcess}
      ></ProcessDropDown>
    )
  }

  return (
    <div className="process__list__content">
      <AddProcessModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddProcessModal>

      <header className="header__container">
        <img src={processIcon} />
        <h1>Processos</h1>
      </header>

      <main className="content__container">
        <div className="process__wrapper">
          {processes.map(renderProcess)}

          <div
            className="add__process__container"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <img src={addProcessIcon} />
            <p>Adicionar processo</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProcessList
