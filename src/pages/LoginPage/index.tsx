import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm';

import sideImage from '../../components/assets/img/Login/Grupo 848.png';
import logo from '../../components/assets/img/Login/Grupo 281.png';
import './style.css';

import axios from 'axios';
import { AuthenticationService } from '../../services/authentication_service';
import { Authenticate } from '../../use_cases/authentication/authenticate';

const LoginPage: React.FC = () => {
  const DETECTION_URL = '/detection';
    const CAMERAS_URL = '/cameras';

  async function isUserAuthenticated() {
    const authenticationUC = new Authenticate(new AuthenticationService());
    const response = await authenticationUC.execute();

    if (response.status === 200) {
      if (response.data.role === 1) {
        window.location.href = CAMERAS_URL;
      } else if (response.data.role === 2) {
          window.location.href = DETECTION_URL;
      }
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