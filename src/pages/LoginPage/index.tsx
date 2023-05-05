import React from 'react';
import sideImage from '../../components/assets/img/Login/Grupo 848.png';
import logo from '../../components/assets/img/Login/Grupo 281.png';
import './style.css';

const LoginPage: React.FC = () => {
    return (
        <div className="loginPage">
            <img className="Login__side__image" src={sideImage} />
            <div className="Login__form__container">    
                <img className="Login__logo" src={logo} />
                <form className="Login__form" method="POST">
                    <div className="Login__inputs__container">
                        <input className="Login__input" type="text" name="username" placeholder="Login" />
                        <small hidden>Insira um login válido</small>
                        <input className="Login__input" type="password" name="password" placeholder="Senha" />
                        <small hidden>Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para redefini-la.</small>
                        <div>
                            <input type="checkbox" />
                            <label>Manter-me conectado</label>
                        </div>
                    </div>
                    
                    <div className="Login__submit__container">
                        <a className="Login__forget__password__link"  href="#">Esqueceu a senha?</a>
                        <input className="Login__submit__button" type="submit" value="Entrar" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;