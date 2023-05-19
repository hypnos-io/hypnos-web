import React, { useState, ChangeEvent, FormEvent } from 'react';
import PasswordInput from './PasswordButton';
import RegistrationInput from './RegistrationInput';
import { LoginService } from '../../services/login_service';
import { Login } from '../../use_cases/authentication/login';

import './style.css';

interface ILoginForm {
    registration: string;
    password: string;
}


const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<ILoginForm>({
        registration: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState<string>('');

    const DETECTION_URL = '/detection';
    const CAMERAS_URL = '/cameras';

    const handleLoginSubmit = async () => {

        const registration = formData.registration;
        const password = formData.password;

        const loginUC = new Login(new LoginService());
        const response = await loginUC.execute(registration, password);
        
        if (response.status === 200) {
            console.log('Usuário logado!');
            if (response.data.role === 1) {
                window.location.href = CAMERAS_URL;
            } else if (response.data.role === 2) {
                window.location.href = DETECTION_URL;
            } else if (response.data.role === 3) {
                window.location.href = DETECTION_URL;
            }
        } else if (response.status === 400) {
            console.log('Não foi possível efetuar login!');
            setErrorMessage(response.data.message);
        }
    };

    return (
        <div className="Login__form">
            <div className="Login__inputs__container">
                <RegistrationInput formData={formData} setFormData={setFormData}></RegistrationInput>
                <PasswordInput formData={formData} setFormData={setFormData}></PasswordInput>
                <span className="error__message">{errorMessage}</span>
                <div className="Login__checkbox__container">
                    <input type="checkbox" />
                    <label>Manter-me conectado</label>
                </div>
            </div>
            
            <div className="Login__submit__container">
                <a className="Login__forget__password__link" href="#">Esqueceu a senha?</a>
                <input className="Login__submit__button" type="submit" value="Entrar" onClick={handleLoginSubmit} />
            </div>
        </div>
    );
}

export default LoginForm;