import React, { useState, ChangeEvent } from 'react';

import './style.css';

import addProcessBackgroundImage from '../../../assets/img/ProcessList/Grupo de máscara 8@2x.png';
import closeIcon from '../../../assets/img/ProcessList/Icon ionic-ios-close-circle-outline@2x.png';
import { Update } from '../../../../use_cases/process/Update';
import { ProcessService } from '../../../../services/process_service';
import { Process } from '../../../../entities/process';

interface UpdateProcessModalProp {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    processProp: Process,
}

function UpdateProcessModal({ isModalOpen, setIsModalOpen, processProp }: UpdateProcessModalProp) {
    if (!isModalOpen) return null;

    const [processName, setProcessName] = useState(processProp.name);

    async function updateProcess() {
        const updateUC = new Update(new ProcessService());
        if (processName.trim().length === 0) return;
        const process = await updateUC.execute(processProp, processName);
        window.location.reload();
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setProcessName(e.target.value);
    }

    return (
        <div className="modal__background">
            <div className="add__process__modal__container">
                <div className="process__modal__header">
                    <img className="modal__header__background" src={addProcessBackgroundImage} />
                    <img className="modal__header__close" onClick={() => setIsModalOpen(!isModalOpen)} src={closeIcon}/>
                </div>
                <div className="modal__body">
                    <div className="process__name__input__container">
                        <h3>Novo nome do processo</h3>
                        <input className="process__modal__input" type="text" name="name" value={processName} onChange={handleInputChange}/>
                    </div>
                    <div className="process__modal__buttons__container">
                        <button className="process__modal__button cancel" onClick={() => setIsModalOpen(!isModalOpen)}>Cancelar</button>
                        <button className="process__modal__button add" onClick={updateProcess}>Atualizar processo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProcessModal;