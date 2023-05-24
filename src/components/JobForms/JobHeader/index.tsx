import backIcon from '../../assets/img/Job/JobHeader/Icon awesome-arrow-left@2x.png';

import './style.css';

import { Process } from "../../../entities/process";
import ProgressBar from './ProgressBar';

interface JobHeaderProps {
    process: Process | null,
    addJobScreen: any,
    jobScreenStep: number
}

function JobHeader({ process, addJobScreen, jobScreenStep }: JobHeaderProps) {
    function renderProgressBar(step: number) {
        if (jobScreenStep == 1) {
            return (
                <>
                    <ProgressBar isComplete={true}><strong>01</strong> Informações Básicas</ProgressBar>
                    <ProgressBar isComplete={false}><strong>02</strong> Adicionar operários</ProgressBar>
                    <ProgressBar isComplete={false}><strong>03</strong> Sincronização</ProgressBar>
                </>
            );
        } else if (jobScreenStep == 2) {
            return (
                <>
                    <ProgressBar isComplete={true}><strong>01</strong> Informações Básicas</ProgressBar>
                    <ProgressBar isComplete={true}><strong>02</strong> Adicionar operários</ProgressBar>
                    <ProgressBar isComplete={false}><strong>03</strong> Sincronização</ProgressBar>
                </>
            );
        } else if (jobScreenStep == 3) {
            return (
                <>
                    <ProgressBar isComplete={true}><strong>01</strong> Informações Básicas</ProgressBar>
                    <ProgressBar isComplete={true}><strong>02</strong> Adicionar operários</ProgressBar>
                    <ProgressBar isComplete={true}><strong>03</strong> Sincronização</ProgressBar>
                </>
            );
        }
    }

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
                {renderProgressBar(jobScreenStep)}
            </div>
        </header>
    );
}

export default JobHeader;