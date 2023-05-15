import React, { useState, ChangeEvent, FormEvent } from 'react';
import PasswordInput from './PasswordButton';
import RegistrationInput from './RegistrationInput';
import login from '../../use_cases/authentication/login';

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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login(formData.registration, formData.password);
    };

    return (
        <form className="Login__form" onSubmit={handleSubmit} method="POST">
            <div className="Login__inputs__container">
                <RegistrationInput formData={formData} setFormData={setFormData}></RegistrationInput>
                <PasswordInput formData={formData} setFormData={setFormData}></PasswordInput>
                <div>
                    <input type="checkbox" />
                    <label>Manter-me conectado</label>
                </div>
            </div>
            
            <div className="Login__submit__container">
                <a className="Login__forget__password__link" href="#">Esqueceu a senha?</a>
                <input className="Login__submit__button" type="submit" value="Entrar" />
            </div>
        </form>
    );
}

export default LoginForm;