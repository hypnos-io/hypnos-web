import React, {useEffect, useState} from 'react'

import {
  FaListAlt as ListViewIcon,
  FaBell as NotificationIcon,
} from 'react-icons/fa'
import {IoGrid as GridViewIcon} from 'react-icons/io5'
import {Workstation} from '../../entities/workstation'
import {WorkstationService} from '../../services/workstation_service'
import {FetchAllBySector} from '../../use_cases/workstation/FetchAllBySector'
import {Title} from '../Title'
import {BadgeStatus, WorkstationCard} from '../WorkstationCard'

import {Socket} from 'socket.io-client'
import {SectorService} from '../../services/sector_service'
import {connect} from '../../services/websocket/connect'
import {
  SocketDataResponse,
  onWorkstationStatus,
} from '../../services/websocket/fatigue'
import {FetchAll as FetchAllSectors} from '../../use_cases/sectors/FetchAll'
import './styles.css'

type ViewType = 'grid' | 'list'

interface WorkstationOnline extends Workstation {
  status: BadgeStatus
}

export const WorkstationStatus: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>('grid')
  const [workstations, setWorkstations] = useState<WorkstationOnline[]>()
  const [socket, setSocket] = useState<Socket>()

  async function fetchAllWorkstations() {
    const fetchAllUC = new FetchAllBySector(new WorkstationService())
    const fectchAllSectorsUC = new FetchAllSectors(new SectorService())

    const allSectors = await fectchAllSectorsUC.execute()

    let allWorkstations: Workstation[] = []

    for (const sector of allSectors) {
      if (sector._id) {
        const workstations = await fetchAllUC.execute(sector._id)
        allWorkstations = [...allWorkstations, ...workstations]
      }
    }

    const allWorkstationsWithDefaultStatus = allWorkstations.map(
      (workstation) => {
        const workstationOnline: WorkstationOnline = {
          ...workstation,
          status: 'off',
        }
        return workstationOnline
      }
    )

    // Show workstations without an employee associated
    const allWorkstationsWithoutEmployee =
      allWorkstationsWithDefaultStatus.filter(
        (workstation) => workstation.employee
      )
    setWorkstations(allWorkstationsWithoutEmployee)
  }

  async function connectWithWebsocketServer() {
    const connectedSocket = await connect()
    setSocket(connectedSocket)
  }

  useEffect(() => {
    connectWithWebsocketServer().then(() => {
      fetchAllWorkstations()
    })
  }, [])

  useEffect(() => {
    if (socket && workstations) {
      workstations.forEach((workstation) => onStatus(workstation, socket))
    }
  }, [socket, workstations])

  function onStatus(workstation: WorkstationOnline, socketio: Socket) {
    onWorkstationStatus(socketio, workstation, changeWorkstationStatus)
  }

  function changeWorkstationStatus(socketResponse: SocketDataResponse) {
    if (!workstations) return
    const workstationsValue = socketResponse.workstation
    const newWorkstations = [...workstations]
    // Find workstation by response workstation value
    for (const [index, workstation] of newWorkstations.entries()) {
      if (workstation.value === workstationsValue) {
        const kss = socketResponse.imageStatus.kssScale

        // Find the new status of workstation
        const status: BadgeStatus =
          kss <= 3 ? 'off' : kss <= 6 ? 'alert' : 'critical'

        // Update workstation status
        newWorkstations[index] = {...workstation, status}
      }
    }
    setWorkstations(newWorkstations)
  }

  function renderWorkstation(workstation: WorkstationOnline, index: number) {
    return (
      <WorkstationCard
        key={`${index}-${workstation.value}`}
        status={workstation.status}
        workstation={workstation}
      />
    )
  }

  function toggleViewMode() {
    const viewMode = viewType === 'grid' ? 'list' : 'grid'
    setViewType(viewMode)
  }

  if (!workstations) {
    return (
      <div className="container">
        <Title title="Detecção de Fadiga nos Postos de Trabalho" live={false} />
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
            <ul className="cards">
              <label>Buscando postos de trabalho...</label>
            </ul>
          </div>

          <div className="notifications">
            <h2 className="title">
              <NotificationIcon size={20} />
              Notificações
            </h2>
            <ul className="cards">
              <label>Buscando notificações...</label>
            </ul>
          </div>
        </main>
      </div>
    )
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
