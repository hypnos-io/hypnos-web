import './style.css';

import {IoMdSearch as SearchIcon} from 'react-icons/io';

function WorkstationSynchronizationHeader() {
    return (
        <div className="workstation__synchro__header__container">
            <div className="workstation__synchro__header">
                <h2>Sincronização de Postos aos Operários</h2>

                <div className="input-group">
                    <SearchIcon size={24} className="icon" />
                    <input
                        type="text"
                        className="input"
                        placeholder="Buscar"
                    />
                </div>
            </div>

            <div className="workstation__synchro__employee__total">
                <p>Total de Operários: 20</p>

                <div>
                    <input type="checkbox" />
                    <label>Sincronização automática</label>
                </div>
            </div>
        </div>
    );
}

export default WorkstationSynchronizationHeader;