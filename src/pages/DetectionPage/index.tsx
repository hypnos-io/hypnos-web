import React from 'react'
import Sidebar from '../../components/Sidebar'
import './style.css'
import { WorkstationStatus } from '../../components/WorkstationStatus'
import { WorkstationStatusList } from '../../components/WorkstationList'

const DetectionPage: React.FC = () => {
  return (
    <div className="detectionPage">
      <Sidebar></Sidebar>
      <WorkstationStatus />
    </div>
  )
}

export default DetectionPage
