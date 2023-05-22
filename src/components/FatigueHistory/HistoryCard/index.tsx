import React from 'react'
import './styles.css'
import {Workstation} from '../../../entities/workstation'
import { Employee } from '../../../entities/employee'
import { FatigueEvent } from '../FatigueEvent'

export const HistoryCard =()=>{

    return(

        <li className='event-section'>
          <div className='card-content'>
            <label className='history-title'> Histórico de ocorrências de fadiga</label>
          </div>

          <div>
            <FatigueEvent></FatigueEvent>
          </div>
        </li>
    )
}