import './style.css';

import arrowIcon from '../../assets/img/ProcessList/Icon ionic-ios-arrow-down@2x.png';
import whitePencilIcon from '../../assets/img/ProcessList/Icon material-edit@2x.png';
import addJobIcon from '../../assets/img/ProcessList/Icon feather-plus-circle@2x.png';

import ProcessTable from './ProcessTable';

function Process() {
    return (
        <div className="process__dropdown">

            <div className="process__header active">

                <div className="process__header__title">
                    <h1>Processo 1</h1>
                    <img src={whitePencilIcon}/>
                </div>
                <img className="arrow" src={arrowIcon}/>

            </div>

            <ProcessTable></ProcessTable>

            <div className="add__task__container">
                <img src={addJobIcon}/>
                <p>Adicionar Tarefa</p>
            </div>

        </div>
    );
}

export default Process;