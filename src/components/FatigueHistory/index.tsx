import React from 'react'
import './styles.css'
import {Workstation} from '../../entities/workstation'
import {OperatorCard} from './OperatorCard'
import { HistoryCard } from './HistoryCard'


function FatigueHistory(){
    
  
return(
    <div className="container">
    <header className='header'>
    <h1 className='title'> Histórico de Operador </h1> 
    </header>
    <main className="content">
      <header className="header">
        <OperatorCard></OperatorCard>
      </header>  
     <div className='header'> 
      <HistoryCard></HistoryCard>
      </div>
</main>
</div>
)

}

export default FatigueHistory