import React, { useState, ChangeEvent } from 'react';
import passwordEyeSlash from '../../assets/img/Login/Icon ionic-md-eye-off@2x.png';
import './style.css';

import { FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa';


type ILoginForm = {
  registration: string;
  password: string;
};

type RegistrationInputProps = {
  formData: ILoginForm;
  setFormData: (data: ILoginForm) => void;
};

const PasswordInput: React.FC<RegistrationInputProps> = ({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={handleInputChange}
          className='Login__input'
          placeholder='Senha'
          name='password'
        />
        <button onClick={handleTogglePassword}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <small hidden>Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para redefini-la.</small>
    </div>
  );
};

export default PasswordInput;
