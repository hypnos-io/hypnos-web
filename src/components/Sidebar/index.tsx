import elipseImg from '../assets/img/Elipse 43.png';
import fatigueIcon from '../assets/img/Grupo 293.png';
import exitButton from '../assets/img/Icon open-account-logout.png';

import './style.css';
import Button from './Button';

function Sidebar() {
    return (
        <div className="sidebar__container">
            <div className="sidebar__content">
                <div>
                    <div className="sidebar__header">
                        <img src={elipseImg} />
                        <div className="sidebar__greeting__container">
                            <h1>Olá,<br/>Ana Maria</h1>
                            <p>Líder</p>
                        </div>
                    </div>
                    <div className="sidebar__buttons__container">
                        <Button icon={fatigueIcon} typeButton="button__normal">Detecção de Fadiga</Button>
                    </div>
                </div>
                <Button icon={exitButton} typeButton="button__exit">Sair</Button>
            </div>
        </div>
    );
}

export default Sidebar;