import React, { useState, ChangeEvent } from 'react';

import './style.css';

import addProcessBackgroundImage from '../../assets/img/ProcessList/Grupo de máscara 8@2x.png';
import closeIcon from '../../assets/img/ProcessList/Icon ionic-ios-close-circle-outline@2x.png';
import { Create } from '../../../use_cases/process/Create';
import { ProcessService } from '../../../services/process_service';

interface AddProcessModalProp {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function AddProcessModal({ isModalOpen, setIsModalOpen }: AddProcessModalProp) {
    if (!isModalOpen) return null;

    const [processName, setProcessName] = useState('');

    async function createProcess() {
        const createUC = new Create(new ProcessService());
        if (processName.trim().length === 0) return;
        const process = await createUC.execute(processName);
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
                        <h3>Adicionar nome do processo</h3>
                        <input className="process__modal__input" type="text" name="name" onChange={handleInputChange}/>
                    </div>
                    <div className="process__modal__buttons__container">
                        <button className="process__modal__button cancel" onClick={() => setIsModalOpen(!isModalOpen)}>Cancelar</button>
                        <button className="process__modal__button add" onClick={createProcess}>Adicionar processo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProcessModal;