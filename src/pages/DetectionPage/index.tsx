import React from 'react'
import Sidebar from '../../components/Sidebar'
import {WorkstationStatus} from '../../components/WorkstationStatus'
import './style.css'
import FatigueHistory from '../../components/FatigueHistory'

const DetectionPage: React.FC = () => {
  return (
    <div className="detectionPage">
      <Sidebar></Sidebar>
      <FatigueHistory></FatigueHistory>
    </div>
  )
}

export default DetectionPage
