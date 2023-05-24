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

function JobForm() {
    const [sectors, setSectors] = useState<Sector[]>([]);

    async function fetchSectors() {
        const fetchUC = new FetchAll(new SectorService());
        const allSectors = await fetchUC.execute();
        setSectors(allSectors);
    }

    function renderSectorOption(sector: Sector, index: number) {
        return (
            <option>{sector.value}</option>
        );
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
                        <input className="job__input__text" type="text" />
                    </div>

                    <div className="job__input__container">
                        <label>Setor</label>
                        <select>
                            <option></option>
                            {sectors.map(renderSectorOption)}
                        </select>
                    </div>

                    <div className="job__input__container">
                        <label>Nª de operários</label>
                        <select>
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
                        <input className="job__input__time" type="time" />
                    </div>

                    <div className="job__input__container">
                        <label>Saída</label>
                        <input className="job__input__time" type="time" />
                    </div>

                    <div className="job__input__container">
                        <label>Duração</label>
                        <select>
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
                            <EPICheckField icon={braceletIcon}>Pulseira Anti Estática</EPICheckField>
                            <EPICheckField icon={bootIcon}>Bota</EPICheckField>
                            <EPICheckField icon={helmetIcon}>Capacete</EPICheckField>
                            <EPICheckField icon={glassesIcon}>Óculos de proteção</EPICheckField>
                            <EPICheckField icon={glovesIcon}>Luvas</EPICheckField>
                            <EPICheckField icon={hearingProtectionIcon}>Protetor Auricular</EPICheckField>
                        </div>
                    </div>
                </div>
            </div>

            <div className="job__form__buttons__container">
                <button className="job__form__cancel__button">Cancelar</button>
                <button className="job__form__continue__button">Prosseguir</button>
            </div>
        </div>
    ); 
}

export default JobForm;