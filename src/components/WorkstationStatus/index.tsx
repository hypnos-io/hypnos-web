import React, {useEffect, useState} from 'react'

import {
  FaListAlt as ListViewIcon,
  FaBell as NotificationIcon,
} from 'react-icons/fa'
import {IoGrid as GridViewIcon} from 'react-icons/io5'
import {Workstation} from '../../entities/workstation'
import {WorkstationService} from '../../services/workstation_service'
import {FetchAll} from '../../use_cases/workstation/FetchAll'
import {Title} from '../Title'
import {WorkstationCard} from '../WorkstationCard'

import './styles.css'

type ViewType = 'grid' | 'list'

export const WorkstationStatus: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>('grid')
  const [workstations, setWorkstations] = useState<Workstation[]>([])

  async function fetchAllWorkstations() {
    const fetchAllUC = new FetchAll(new WorkstationService())
    const allWorkstations = await fetchAllUC.execute()
    setWorkstations(allWorkstations)
  }

  useEffect(() => {
    fetchAllWorkstations()
  }, [])

  function renderWorkstation(workstation: Workstation, index: number) {
    return (
      <WorkstationCard
        key={`${index}-${workstation.value}`}
        status="alert"
        workstation={workstation}
      />
    )
  }

  function toggleViewMode() {
    const viewMode = viewType === 'grid' ? 'list' : 'grid'
    setViewType(viewMode)
  }

  return (
    <div className="container">
      <Title title="Detecção de Fadiga nos Postos de Trabalho" live />
      <main className="content">
        <header className="header">
          <label className="title">Visualização</label>
          <GridViewIcon
            className="button"
            size={20}
            onClick={toggleViewMode}
            opacity={viewType === 'grid' ? 1 : 0.5}
          />
          <ListViewIcon
            className="button"
            size={20}
            onClick={toggleViewMode}
            opacity={viewType === 'list' ? 1 : 0.5}
          />
        </header>

        <div className="workstations">
          <h2 className="title">Postos de trabalho</h2>
          <ul className="cards">{workstations.map(renderWorkstation)}</ul>
        </div>

        <div className="notifications">
          <h2 className="title">
            <NotificationIcon size={20} />
            Notificações
          </h2>
          <ul className="cards">{workstations.map(renderWorkstation)}</ul>
        </div>
      </main>
    </div>
  )
}
