import React from 'react'
import Sidebar from '../../components/Sidebar'
import ProcessList from '../../components/ProcessList'
import './style.css'

const ProcessPage: React.FC = () => {
  return (
    <div className="processPage">
      <Sidebar></Sidebar>
      <ProcessList></ProcessList>
    </div>
  )
}

export default ProcessPage
