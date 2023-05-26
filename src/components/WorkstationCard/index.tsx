import React from 'react'

import {Workstation} from '../../entities/workstation'
import './styles.css'

export type BadgeStatus = 'off' | 'alert' | 'critical'

interface Props {
  workstation: Workstation
  status: BadgeStatus
}

import {handleImageError} from '../../common/handle_image_error'

import DefaultImage from '../../components/assets/img/unknown person.jpg'

export const WorkstationCard: React.FC<Props> = ({workstation, status}) => {
  const {employee} = workstation

  const hasEmployee = !!employee

  const fullName = hasEmployee
    ? `${employee.name || 'Usuário indefinido'}`
    : 'Sem operador'

  const registration = employee ? `${employee.registration}` : ''

  return (
    <li className={`card ${!hasEmployee ? 'none' : ''} ${status}`}>
      <img
        src={employee?.imageURL || DefaultImage}
        onError={(event) => handleImageError(event, DefaultImage)}
        alt="profile"
        className="profile"
      />
      <div className="description">
        <label className="employee-name">{fullName}</label>
        <label className="employee-registration">{registration}</label>
        <label className="workstation-value">{workstation.value}</label>
      </div>
    </li>
  )
}
