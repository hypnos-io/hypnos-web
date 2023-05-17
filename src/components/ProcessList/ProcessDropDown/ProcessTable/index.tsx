import {useState, useEffect} from 'react';

import './style.css';

import arrowsUpDownIcon from '../../../assets/img/ProcessList/Grupo 183@2x.png';
import blackPencilIcon from '../../../assets/img/ProcessList/Icon open-pencil@2x.png';
import deleteIcon from '../../../assets/img/ProcessList/Icon material-delete@2x.png';
import addJobIcon from '../../../assets/img/ProcessList/Icon feather-plus-circle@2x.png';
import { Job } from '../../../../entities/job';

interface ProcessTableProps {
    jobs: Job[]
}

function ProcessTable({ jobs }: ProcessTableProps) {

    function renderJob(job: Job, index: number) {
        return (
            <tr key={`${index}-${job._id}`} className="table__row">
                <td><img src={arrowsUpDownIcon}/></td>
                <td>{job.name}</td>
                <td>1</td>
                <td>{job.durationInHours}h</td>
                <td>8:00</td>
                <td>12:00</td>
                <td>5</td>
                <td><img src={blackPencilIcon}/></td>
                <td><img src={deleteIcon}/></td>
            </tr>
        );
    }

    return (
        <>
            <table className="process__table">

                <tbody>
                    <tr className="table__header">
                        <th></th>
                        <th>Tarefa</th>
                        <th>Setor</th>
                        <th>Duração</th>
                        <th>Entrada</th>
                        <th>Saída</th>
                        <th>Nº de operários</th>
                        <th></th>
                        <th></th>
                    </tr>

                    {jobs.map(renderJob)}
                    
                </tbody>
            
            </table>

            <div className="add__task__container">
                <img src={addJobIcon}/>
                <p>Adicionar Tarefa</p>
            </div>
        </>
    );
}

export default ProcessTable;