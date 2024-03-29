import backIcon from '../../assets/img/Job/JobHeader/Icon awesome-arrow-left@2x.png'

import './style.css'

import {Process} from '../../../entities/process'
import ProgressBar from './ProgressBar'

interface JobHeaderProps {
  process: Process | null
  setCurrentPage: any
  jobScreenStep: number
}

function JobHeader({process, setCurrentPage, jobScreenStep}: JobHeaderProps) {
  function renderProgressBar(step: number) {
    return (
      <>
        <ProgressBar isComplete={true}>
          <strong>01</strong> Informações Básicas
        </ProgressBar>
        <ProgressBar isComplete={step > 1}>
          <strong>02</strong> Adicionar operários
        </ProgressBar>
        <ProgressBar isComplete={step > 2}>
          <strong>03</strong> Sincronização
        </ProgressBar>
      </>
    )
  }

  return (
    <header>
      <div className="job__header__title__container">
        <div className="add__job__header__title">
          <img src={backIcon} onClick={() => setCurrentPage(0)} />
          <h1>Adicionar tarefa</h1>
        </div>
        <p>{process?.name} &gt; Adicionar Tarefa</p>
      </div>
      <div className="job__progress__containers">
        {renderProgressBar(jobScreenStep)}
      </div>
    </header>
  )
}

export default JobHeader
