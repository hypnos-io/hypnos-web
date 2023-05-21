import React, {useEffect, useState} from 'react'

import {
  FaListAlt as ListViewIcon,
} from 'react-icons/fa'
import {IoGrid as GridViewIcon} from 'react-icons/io5'
import {Workstation} from '../../entities/workstation'
import {WorkstationService} from '../../services/workstation_service'
import {FetchAll} from '../../use_cases/workstation/FetchAll'
import {Title} from '../Title'
import {Socket} from 'socket.io-client'
import {connect} from '../../services/websocket/connect'
import {
  SocketDataResponse,
  onWorkstationStatus,
} from '../../services/websocket/fatigue'
import './styles.css'
import {BadgeStatus ,WorkstationTable } from '../WorkstationTable'

type ViewType = 'grid' | 'list'

interface WorkstationOnline extends Workstation {
  status: BadgeStatus
}

export const WorkstationStatusList: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>('list')
  const [workstations, setWorkstations] = useState<WorkstationOnline[]>()
  const [socket, setSocket] = useState<Socket>()

  async function fetchAllWorkstations() {
    const fetchAllUC = new FetchAll(new WorkstationService())
    const allWorkstations = await fetchAllUC.execute()
    const allWorkstationsWithDefaultStatus = allWorkstations.map(
      (workstation) => {
        const workstationOnline: WorkstationOnline = {
          ...workstation,
          status: 'off',
        }
        return workstationOnline
      }
    )
    setWorkstations(allWorkstationsWithDefaultStatus)
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
      <WorkstationTable
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

if(!workstations){
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
        
          <table className='table'> 
          <thead className='head'>
           <tr >
            <th className='title'>Operários</th>
            <th className='title'>Posto</th>
            <th className='title'>Status</th>
            <th className='title'>Horário</th>
            <th className='title'>Histórico</th>
           </tr>
          </thead>
          <tbody className='body'>
            <tr className='line'>

              <td>Buscando postos de trabalho...</td>

            </tr>       
          </tbody>  
        </table>
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
        
            <table className='table'> 
          <thead className='head'>
           <tr >
            <th className='title'>Operários</th>
            <th className='title'>Posto</th>
            <th className='title'>Status</th>
            <th className='title'>Horário</th>
            <th className='title'>Histórico</th>
           </tr>
          </thead>
          <tbody className='body'>
    
            {workstations.map(renderWorkstation)}
        
          </tbody>   
        </table>
          </main>
        </div>
      )
    }



 