import './style.css';

import processIcon from '../assets/img/ProcessList/Icon ionic-ios-git-network@2x.png';
import addProcessIcon from '../assets/img/ProcessList/Icon feather-plus-circle-white@2x.png';

import Process from './Process';

function ProcessList() {
    return (
        <div className="content">
            <header className="header__container">
                <img src={processIcon}/>
                <h1>Processos</h1>
            </header>

            <main className="content__container">

                <div className="process__wrapper">

                    <Process></Process>
                    
                    <div className="add__process__container">
                        <img src={addProcessIcon}/>
                        <p>Adicionar processo</p>
                    </div>

                </div>

            </main>
        </div>
    )
}

export default ProcessList;