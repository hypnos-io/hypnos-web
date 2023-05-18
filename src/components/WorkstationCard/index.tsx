import React from 'react'

import {Workstation} from '../../entities/workstation'
import './styles.css'

export type BadgeStatus = 'off' | 'alert' | 'critical'

interface Props {
  workstation: Workstation
  status: BadgeStatus
}

export const WorkstationCard: React.FC<Props> = ({workstation, status}) => {
  const {employee} = workstation

  const hasEmployee = !!employee

  const fullName = hasEmployee ? `${employee.name}` : 'Sem operador'

  const registration = employee ? `#${employee.registration}` : ''

  return (
    <li className={`card ${!hasEmployee ? 'none' : ''} ${status}`}>
      <img
        src="https://images.unsplash.com/photo-1592948078640-39656341be54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="profile"
        className="profile"
      />
      <div className="description">
        <label className="employee-name">{fullName}</label>
        <label className="employee-registration">{registration}</label>
        <label className="workstation-value">Posto {workstation.value}</label>
      </div>
    </li>
  )
}
