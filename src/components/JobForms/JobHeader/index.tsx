import backIcon from '../../assets/img/Job/JobHeader/Icon awesome-arrow-left@2x.png';
import checkIcon from '../../assets/img/Job/JobHeader/Icon awesome-check@2x.png';
import progressBarBlue from '../../assets/img/Job/JobHeader/Retângulo 181@2x.png';
import progressBarGray from '../../assets/img/Job/JobHeader/Retângulo 947@2x.png';

import './style.css';

import { Process } from "../../../entities/process";

interface JobHeaderProps {
    process: Process | null,
    addJobScreen: any
}

function JobHeader({ process, addJobScreen }: JobHeaderProps) {
    return (
        <header>
            <div className="job__header__title__container">
                <div className="add__job__header__title">
                    <img src={backIcon} onClick={() => addJobScreen()} />
                    <h1>Adicionar tarefa</h1>
                </div>
                <p>{process?.name} &gt; Adicionar Tarefa</p>
            </div>
            <div className="job__progress__containers">
                <div className="job__progress__container">

                    <p><strong>01</strong> Informações Básicas</p>

                    <div className="job__progress__bar__container">

                        <div className="progress__bar__circle complete">
                            <img src={checkIcon} />    
                        </div>
                        <img className="job__progress__bar__img" src={progressBarBlue} />

                    </div> 

                </div>

                <div className="job__progress__container">

                    <p><strong>02</strong> Adicionar operários</p>

                    <div className="job__progress__bar__container">
                        
                        <div className="progress__bar__circle incomplete">

                        </div>
                        <img className="job__progress__bar__img" src={progressBarGray} />

                    </div> 

                </div>

                <div className="job__progress__container">

                    <p><strong>03</strong> Sincronização</p>

                    <div className="job__progress__bar__container">
                        
                        <div className="progress__bar__circle incomplete">

                        </div>
                        <img className="job__progress__bar__img" src={progressBarGray} />

                    </div> 

                </div>
            </div>
        </header>
    );
}

export default JobHeader;