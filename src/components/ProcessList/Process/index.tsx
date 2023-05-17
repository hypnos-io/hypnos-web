import { useState } from 'react';

import './style.css';

import arrowIcon from '../../assets/img/ProcessList/Icon ionic-ios-arrow-down@2x.png';
import whitePencilIcon from '../../assets/img/ProcessList/Icon material-edit@2x.png';

import ProcessTable from './ProcessTable';

function Process() {
    const [isActive, setIsActive] = useState(true);

    function onClickProcessTable() {
        setIsActive(!isActive);
    }

    return (
        <div className="process__dropdown">

            <div className={isActive ? "process__header active" : "process__header"}>

                <div className="process__header__title">
                    <h1>Processo 1</h1>
                    <img src={whitePencilIcon}/>
                </div>
                <img className="arrow" src={arrowIcon} onClick={onClickProcessTable}/>

            </div>

            <div>

                {isActive && <ProcessTable></ProcessTable>}

            </div>

        </div>
    );
}

export default Process;