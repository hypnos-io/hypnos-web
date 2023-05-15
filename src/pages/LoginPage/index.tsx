import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm';

import sideImage from '../../components/assets/img/Login/Grupo 848.png';
import logo from '../../components/assets/img/Login/Grupo 281.png';
import './style.css';

import axios from 'axios';

const LoginPage: React.FC = () => {

    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const response = await axios.get('http://localhost:3000/authenticated');
            if (response.status === 400) {
                console.log('teste');
            }
            console.log('Usuário autenticado:', response.data);
          } catch (error) {
            console.log('Usuário não autenticado:', error);
          }
        };
    
        checkAuthentication();
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