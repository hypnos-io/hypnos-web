import React from 'react'
import Sidebar from '../../components/Sidebar'
import {WorkstationStatus} from '../../components/WorkstationStatus'
import './style.css'

const DetectionPage: React.FC = () => {
  return (
    <div className="detectionPage">
      <Sidebar></Sidebar>
      <WorkstationStatus />
    </div>
  )
}

export default DetectionPage
