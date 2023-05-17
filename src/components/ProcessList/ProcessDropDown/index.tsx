import { useState, useEffect } from 'react';

import './style.css';

import arrowIcon from '../../assets/img/ProcessList/Icon ionic-ios-arrow-down@2x.png';
import whitePencilIcon from '../../assets/img/ProcessList/Icon material-edit@2x.png';

import ProcessTable from './ProcessTable';
import { Process } from '../../../entities/process';
import { FetchAll } from '../../../use_cases/job/FetchAll';
import { JobService } from '../../../services/job_service';
import { Job } from '../../../entities/job';

interface ProcessDropDownProps {
    processProp: Process
}

function ProcessDropDown({ processProp }: ProcessDropDownProps) {
    const [isActive, setIsActive] = useState(false);
    const [process, setProcess] = useState<Process>(processProp);
    const [jobs, setJobs] = useState<Job[]>([]);

    async function fetchJobs() {
        const fetchAllUC = new FetchAll(new JobService());
        const allJobs = await fetchAllUC.execute(processProp);
        setJobs(allJobs);
    }

    function onClickProcessTable() {
        setIsActive(!isActive);
    }

    useEffect(() => {
        fetchJobs();
    }, []);


    return (
        <div className="process__dropdown">

            <div className={isActive ? "process__header active" : "process__header"}>

                <div className="process__header__title">
                    <h1>{process.name}</h1>
                    <img src={whitePencilIcon}/>
                </div>
                <img className="arrow" src={arrowIcon} onClick={onClickProcessTable}/>

            </div>

            <div>

                {isActive && <ProcessTable jobs={jobs}></ProcessTable>}

            </div>

        </div>
    );
}

export default ProcessDropDown;