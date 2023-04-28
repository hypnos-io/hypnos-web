import elipseImg from '../assets/img/Elipse 43.png';
import fatigueIcon from '../assets/img/Grupo 293@2x.png';
import backIcon from '../assets/img/Icon open-account-logout@2x.png';
import './style.css';
import NavButton from './NavButton';

function Sidebar() {
    return (
        <div className="Sidebar__container">
            <div className="Sidebar__content">
                <div className="Sidebar__header">
                    <img src={elipseImg} />
                    <div className="Sidebar__greeting__container">
                        <h1>Olá,<br/>Ana Maria</h1>
                        <p>Líder</p>
                    </div>
                </div>
                <div className="Sidebar__buttons__container">
                    <div className="Sidebar__navbuttons__container">
                        <NavButton path="/" icon={fatigueIcon}>Detecção de Fadiga</NavButton>
                        <NavButton path="/image-capture" icon={fatigueIcon}>Iniciar captura de imagem</NavButton>
                    </div>
                    <NavButton path="/logout" icon={backIcon}>Sair</NavButton>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;