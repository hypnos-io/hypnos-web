import { useState, useEffect } from 'react';

import './style.css';

import processIcon from '../assets/img/ProcessList/Icon ionic-ios-git-network@2x.png';
import addProcessIcon from '../assets/img/ProcessList/Icon feather-plus-circle-white@2x.png';

import ProcessDropDown from './ProcessDropDown';

import { FetchAll } from '../../use_cases/process/FetchAll';
import { ProcessService } from '../../services/process_service';
import { Process } from '../../entities/process';

function ProcessList() {
    const [processes, setProcesses] = useState<Process[]>([]);

    async function fetchAllProcesses() {
        const fetchAllUC = new FetchAll(new ProcessService());
        const allProcesses = await fetchAllUC.execute();
        setProcesses(allProcesses);
    }

    useEffect(() => {
        fetchAllProcesses();
    }, []);

    function renderProcess(process: Process, index: number) {
        return (
            <ProcessDropDown key={`${index}-${process._id}`} processProp={process} ></ProcessDropDown>
        );
    }


    return (
        <div className="content">
            <header className="header__container">
                <img src={processIcon}/>
                <h1>Processos</h1>
            </header>

            <main className="content__container">

                <div className="process__wrapper">

                    {processes.map(renderProcess)}
                    
                    <div className="add__process__container">
                        <img src={addProcessIcon}/>
                        <p>Adicionar processo</p>
                    </div>

                </div>

            </main>
        </div>
    )
}

export default ProcessList;