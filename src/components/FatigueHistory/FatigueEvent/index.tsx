import React from 'react'
import './styles.css'
import {Workstation} from '../../../entities/workstation'
import { Employee } from '../../../entities/employee'

export const FatigueEvent = () =>{
    return(
      <div className='fatigue-event'>
        <div className='fatigue-card'>
            
          <label className='fatigue-info'> Causa:<p>Inclinação da cabeça</p></label>
          <label className='fatigue-info'> Horário:<p>8:30H</p></label>
          <label className='fatigue-info'> Data da ocorrência:<p>18/05/2022</p></label>
          
        </div>

        <div className='fatigue-card'>
          <label className='fatigue-info'> Posto de Trabalho de Infração: <p>47</p></label>
          <label className='fatigue-info'> Nível da Infração: <p>Grave</p></label>
        </div>
        </div>
    )
}