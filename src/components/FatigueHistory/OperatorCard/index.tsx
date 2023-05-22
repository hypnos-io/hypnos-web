import React from 'react'
import './styles.css'
import {Workstation} from '../../../entities/workstation'
import { Employee } from '../../../entities/employee'
import { WorkstationTable } from '../../WorkstationTable'
import { useLocation } from 'react-router-dom';



export const OperatorCard = () => {
     
  const location = useLocation();
  const { employeeData } = location.state || {};
    
    return(
      <li className='card'>
        <div className='card-content'>
        <img
        src="https://images.unsplash.com/photo-1592948078640-39656341be54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="profile"
        className="profile"
      />
      <div className='employee-container'>
        <label className="header"> Ana Maria dos Santos de Souza</label>
        <p className='description'>Operador </p>
        <p className='description'>#441</p>
      </div>
      <div className='info-work'>
      <div className='info-container'>
        <label className='work-description'>Posto de trabalho: 45</label>
        <label className='work-description'>Data de admissão: Grave</label>

      </div>
      </div>
      </div>
      </li>
    )
}
