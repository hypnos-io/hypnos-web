import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm';

import sideImage from '../../components/assets/img/Login/Grupo 848.png';
import logo from '../../components/assets/img/Login/Grupo 281.png';
import './style.css';

import axios from 'axios';
import { AuthenticationService } from '../../services/authentication_service';
import { Authenticate } from '../../use_cases/authentication/authenticate';

const LoginPage: React.FC = () => {
  const HOME_URL = '/home';

  async function isUserAuthenticated() {
    const authenticationUC = new Authenticate(new AuthenticationService());
    const response = await authenticationUC.execute();

    if (response.status === 200) {
      window.location.href = HOME_URL;
    } 
  }

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <div className="loginPage">
      <img className="Login__side__image" src={sideImage} />
      <div className="Login__form__container">    
        <img className="Login__logo" src={logo} />
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;