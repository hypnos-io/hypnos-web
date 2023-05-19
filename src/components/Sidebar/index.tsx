import {useEffect, useState} from 'react'

import fatigueIcon from '../assets/img/Sidebar/Grupo 293@2x.png'
import registerIcon from '../assets/img/Sidebar/Icon awesome-users@2x.png'
import processIcon from '../assets/img/Sidebar/Icon ionic-ios-git-network@2x.png'
import cameraIcon from '../assets/img/Sidebar/Icon metro-video-camera@2x.png'
import backIcon from '../assets/img/Sidebar/Icon open-account-logout@2x.png'

import './style.css'

import LogoutButton from './LogoutButton'
import NavButton from './NavButton'

import {AuthenticationService} from '../../services/authentication_service'
import {Authenticate} from '../../use_cases/authentication/authenticate'
import { Leader } from '../../entities/leader'
import { Employee } from '../../entities/employee'
import { Supervisor } from '../../entities/supervisor'

function Sidebar() {
  const [user, setUser] = useState<Employee | Supervisor | Leader | null>(null);

  const LOGIN_URL = '/';

  async function getAuthenticatedUser() {
    const authenticationUC = new Authenticate(new AuthenticationService());
    const response = await authenticationUC.execute();

    if (response.status === 200) {
      const userRole = response.data.role;
      const currentPage = new URL(window.location.href).pathname;

      if (userRole === 1) {
        if (currentPage === '/detection') {
          window.location.href = '/cameras';
        }
      } else if (userRole === 2) {
        if (currentPage !== '/detection') {
          window.location.href = '/detection';
        }
      }
      setUser(response.data);
    } else {
      window.location.href = LOGIN_URL;
    }
  }

  function renderButtons() {
    if (user?.role === 0) {
      return <></>;
    } else if (user?.role === 1) {
      return (
        <>
          <NavButton path="/process" icon={processIcon}>
            Processos
          </NavButton>
          <NavButton path="/signUp" icon={registerIcon}>
            Cadastros
          </NavButton>
          <NavButton path="/cameras" icon={cameraIcon}>
            Câmeras
          </NavButton>
        </>
      );
    } else if (user?.role === 2) {
      return (
        <>
          <NavButton path="/detection" icon={fatigueIcon}>
            Detecção de Fadiga
          </NavButton>
        </>
      );
    } else if (user?.role === 3) {
      return (
        <>
          <NavButton path="/detection" icon={fatigueIcon}>
            Detecção de Fadiga
          </NavButton>
          <NavButton path="/process" icon={processIcon}>
            Processos
          </NavButton>
          <NavButton path="/signUp" icon={registerIcon}>
            Cadastros
          </NavButton>
          <NavButton path="/cameras" icon={cameraIcon}>
            Câmeras
          </NavButton>
        </>
      );
    }
  }

  function getUserRole() {
    if (user?.role === 1) {
      return 'Gerente';
    } else if (user?.role === 2) {
      return 'Líder';
    } else if (user?.role === 3) {
      return 'Administrador';
    }
    return '';
  }

  function getFirstName(fullName: string) {
    if (fullName == null) return;
    const firstName = fullName.split(' ')[0];
    return firstName;
  }

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return (
    <div className="Sidebar__container">
      <div className="Sidebar__content">
        <div className="Sidebar__header">
          <img src="https://images.unsplash.com/photo-1592948078640-39656341be54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
          <div className="Sidebar__greeting__container">
            <h1>
              Olá,
              <br />
              {user ? getFirstName(user.name) : ''}
            </h1>
            <p>{getUserRole()}</p>
          </div>
        </div>
        <div className="Sidebar__buttons__container">
          <div className="Sidebar__navbuttons__container">
            {renderButtons()}
          </div>
          <LogoutButton path="/" icon={backIcon}>
            Sair
          </LogoutButton>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
