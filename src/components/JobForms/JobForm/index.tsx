import {useState, useEffect} from 'react';

import './style.css';

import braceletIcon from '../../assets/img/Job/JobForm/Grupo 234@2x.png';
import bootIcon from '../../assets/img/Job/JobForm/Grupo 366@2x.png';
import helmetIcon from '../../assets/img/Job/JobForm/Grupo 326@2x.png';
import glassesIcon from '../../assets/img/Job/JobForm/Grupo 324@2x.png';
import glovesIcon from '../../assets/img/Job/JobForm/Grupo 325@2x.png';
import hearingProtectionIcon from '../../assets/img/Job/JobForm/Grupo 2344@2x.png';

import EPICheckField from './EPICheckField';
import { FetchAll } from '../../../use_cases/sectors/FetchAll';
import { SectorService } from '../../../services/sector_service';
import { Sector } from '../../../entities/sector';
import { Job } from '../../../entities/job';
import { Process } from '../../../entities/process';

interface JobFormProps {
    process: Process,
    addJobScreen: () => void
}

function JobForm({ process, addJobScreen }: JobFormProps) {
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [job, setJob] = useState<Job>({
        name: '',
        employeeSize: 0,
        startAt: new Date(),
        endAt: new Date(),
        durationInHours: 0,
        process: process,
        sector: undefined,
        epis: []
    });

    async function fetchSectors() {
        const fetchUC = new FetchAll(new SectorService());
        const allSectors = await fetchUC.execute();
        setSectors(allSectors);
    }

    function renderSectorOption(sector: Sector, index: number) {
        return (
            <option key={`${index}-${sector._id}`}>{sector.value}</option>
        );
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        let fieldValue: string | number = value;

        if (name === 'employeeSize' || name === 'durationInHours') {
            fieldValue = parseInt(value, 10);
        }

        setJob(prevJob => ({
            ...prevJob,
            [name]: fieldValue,
        }));
    };

    const handleSelectSector = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSectorValue = event.target.value;
        const selectedSector = sectors.find(sector => sector.value === selectedSectorValue);
    
        setJob(prevJob => ({
            ...prevJob,
            sector: selectedSector,
        }));
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const [hours, minutes] = value.split(':');
        const currentDate = new Date();
        const selectedTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), parseInt(hours, 10), parseInt(minutes, 10));
    
        setJob(prevJob => ({
            ...prevJob,
            [name]: selectedTime,
        }));
    };
    
    const handleEpisChange = (epi: string) => {
        const updatedEpis = [...job.epis];
        const index = updatedEpis.indexOf(epi);
        if (index === -1) {
            updatedEpis.push(epi);
        } else {
            updatedEpis.splice(index, 1);
        }
        setJob(prevJob => ({
            ...prevJob,
            epis: updatedEpis,
        }));
    };

    function handleContinueButton() {
        console.log(job);
    }

    useEffect(() => {
        fetchSectors();
    }, []);

    return (
        <div className="job__form__container">
            <div className="job__form__fields__container">
                <h3>Informações Básicas</h3>

                <div className="job__form__input__row">

                    <div className="job__input__container">
                        <label>Nome da tarefa</label>
                        <input className="job__input__text" type="text" name="name" value={job.name} onChange={handleInputChange}/>
                    </div>

                    <div className="job__input__container">
                        <label>Setor</label>
                        <select name="sector" onChange={handleSelectSector}>
                            <option></option>
                            {sectors.map(renderSectorOption)}
                        </select>
                    </div>

                    <div className="job__input__container">
                        <label>Nª de operários</label>
                        <select name="employeeSize" onChange={handleInputChange}>
                            <option></option>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                            <option>50</option>
                        </select>
                    </div>

                </div>

                <div className="job__form__input__row">
                    <div className="job__input__container">
                        <label>Entrada</label>
                        <input className="job__input__time" name="startAt" onChange={handleTimeChange} type="time" />
                    </div>

                    <div className="job__input__container">
                        <label>Saída</label>
                        <input className="job__input__time" name="endAt" onChange={handleTimeChange} type="time" />
                    </div>

                    <div className="job__input__container">
                        <label>Duração</label>
                        <select name="durationInHours" onChange={handleInputChange}>
                            <option></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                        </select>
                    </div>

                    <div className="job__input__container">
                        <label>Turno</label>
                        <select>
                            <option></option>
                            <option>Matutino</option>
                            <option>Vespertino</option>
                            <option>Noturno</option>
                        </select>
                    </div>
                </div>

                <div className="job__form__input__row">
                    <div className="job__input__container">
                        <label>EPIs necessários</label>
                        <div className="job__epis__container">
                            <EPICheckField icon={braceletIcon} handleEpisChange={handleEpisChange}>Pulseira Anti Estática</EPICheckField>
                            <EPICheckField icon={bootIcon} handleEpisChange={handleEpisChange}>Bota</EPICheckField>
                            <EPICheckField icon={helmetIcon} handleEpisChange={handleEpisChange}>Capacete</EPICheckField>
                            <EPICheckField icon={glassesIcon} handleEpisChange={handleEpisChange}>Óculos de proteção</EPICheckField>
                            <EPICheckField icon={glovesIcon} handleEpisChange={handleEpisChange}>Luvas</EPICheckField>
                            <EPICheckField icon={hearingProtectionIcon} handleEpisChange={handleEpisChange}>Protetor Auricular</EPICheckField>
                        </div>
                    </div>
                </div>
            </div>

            <div className="job__form__buttons__container">
                <button className="job__form__cancel__button" onClick={() => addJobScreen()}>Cancelar</button>
                <button className="job__form__continue__button" onClick={handleContinueButton}>Prosseguir</button>
            </div>
        </div>
    ); 
}

export default JobForm;