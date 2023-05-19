import React from 'react'

import {Workstation} from '../../entities/workstation'
import './styles.css'
import { getCurrentTime } from '../../common/current_time'
import { Employee } from '../../entities/employee'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

export type BadgeStatus = 'off' | 'alert' | 'critical'

interface Props {
  workstation: Workstation
  status: BadgeStatus
}

export const WorkstationTable: React.FC<Props> = ({workstation, status}) => {
  const {employee} = workstation

  const hasEmployee = !!employee

  const fullName = hasEmployee
    ? `${employee.firstName} ${employee.lastName}`
    : 'Sem operador'

  const role = hasEmployee ? ` ${employee.role} ` : 'Operador'

  const registration = employee ? `#${employee.registration}` : '#441'


  return (
   
      <tr className='line'>
          <td className='description'>
            <img
            src="https://images.unsplash.com/photo-1592948078640-39656341be54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="profile"
            className="profile"
          /> 
      <div className='employee-container'>
        <label className='name'>{fullName}</label>
        <p >{role} {registration}</p>

      </div>
            </td>
          <td className='workstation-value'>{workstation.value}</td>
          <td className= 'status'><span className= {`status span ${status}`}>{status}</span></td>
          <td >{getCurrentTime()}H</td>
          <td className='text-button'>Ver Histórico</td>
        </tr>
    
  )
}