import fatigueIcon from '../assets/img/Grupo 293@2x.png'
import backIcon from '../assets/img/Icon open-account-logout@2x.png'
import processIcon from '../assets/img/Icon ionic-ios-git-network@2x.png';
import registerIcon from '../assets/img/Icon awesome-users@2x.png';
import NavButton from './NavButton';
import './style.css'
import {useEffect} from 'react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { can } from '../../use_cases/authorization/can';

function Sidebar() {
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authenticated');
        if (response.status === 200) {
            console.log('teste');
        }
      } catch (error) {
        console.log('Usuário não autenticado:', error);
      }
    };

    checkAuthentication();
  }, []);

  const permissions = can(1);

  const navButtons: JSX.Element[] = [];
  for (let i = 0; i < permissions.length; i++) {
    if (permissions[i] === 'VIEW_HISTORY_FATIGUE') {
      navButtons.push(
        <NavButton key={i} path="/" icon={fatigueIcon}>Detecção de Fadiga</NavButton>
      )
    }
    else if (permissions[i] === 'CREATE_PROCESS') {
      navButtons.push(
        <NavButton key={i} path="/process" icon={processIcon}>Processos</NavButton>
      )
    }
    else if (permissions[i] === 'CREATE_EMPLOYEE') {
      navButtons.push(
        <NavButton key={i} path="/register" icon={registerIcon}>Cadastros</NavButton>
      )
    }
    else if (permissions[i] === 'VIEW_CAMERAS') {
      navButtons.push(
        <NavButton key={i} path="/cameras" icon={registerIcon}>Câmeras</NavButton>
      )
    }
  }

  return (
    <div className="Sidebar__container">
      <div className="Sidebar__content">
        <div className="Sidebar__header">
          <img src="https://images.unsplash.com/photo-1592948078640-39656341be54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
          <div className="Sidebar__greeting__container">
            <h1>
              Olá,
              <br />
              Ana Maria
            </h1>
            <p>Líder</p>
          </div>
        </div>
        <div className="Sidebar__buttons__container">
          <div className="Sidebar__navbuttons__container">
            {navButtons}
            <NavButton path="/image-capture" icon={fatigueIcon}>
              Iniciar captura de imagem
            </NavButton>
          </div>
          <LogoutButton path="/login" icon={backIcon}>
            Sair
          </LogoutButton>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
