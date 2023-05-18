import React, { useEffect, useState } from 'react'
import usersIcon from '../assets/img/Icon awesome-users@2x.png'
import fatigueIcon from '../assets/img/Grupo 293@2x.png'
import backIcon from '../assets/img/Icon open-account-logout@2x.png'

import processIcon from '../assets/img/Sidebar/Icon ionic-ios-git-network@2x.png';
import registerIcon from '../assets/img/Sidebar/Icon awesome-users@2x.png';
import cameraIcon from '../assets/img/Sidebar/Icon metro-video-camera@2x.png';

import './style.css'

import LogoutButton from './LogoutButton';
import NavButton from './NavButton';

import { User } from '../../entities/user';
import { AuthenticationService } from '../../services/authentication_service';
import { Authenticate } from '../../use_cases/authentication/authenticate';

function Sidebar() {
  const [user, setUser] = useState<User>();

  const LOGIN_URL = '/';

  async function getAuthenticatedUser() {
    const authenticationUC = new Authenticate(new AuthenticationService());
    const response = await authenticationUC.execute();

    if (response.status === 200) {
      setUser(response.data);
    } else {
      window.location.href = LOGIN_URL;
    }
  }

  function renderButtons() {
    if (user?.role === 0) {
      return (
        <></>
      );
    } else if (user?.role === 1) {
      return (
        <>
          <NavButton path="/process" icon={processIcon}>Processos</NavButton>
          <NavButton path="/signUp" icon={registerIcon}>Cadastros</NavButton>
          <NavButton path="/cameras" icon={cameraIcon}>Câmeras</NavButton>
        </>
      );
    } else if (user?.role === 2) {
      return (
        <>
          <NavButton path="/" icon={fatigueIcon}>Detecção de Fadiga</NavButton>
        </>
      );
    }
  }

  function getUserRole() {
    if (user?.role === 1) {
      return 'Gerente';
    } else if (user?.role === 2) {
      return 'Líder';
    }
    return '';
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
              {user?.firstName}
            </h1>
            <p>
              {getUserRole()}
            </p>
          </div>
        </div>
        <div className="Sidebar__buttons__container">
          <div className="Sidebar__navbuttons__container">
            {renderButtons()}
          </div>
          <LogoutButton path="/login" icon={backIcon}>
            Sair
          </LogoutButton>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
