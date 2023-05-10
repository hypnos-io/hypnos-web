import React, { useState, useEffect, ReactNode } from 'react';
import uploadButton from '../assets/img/Grupo 618@2x.png'
import unkownPersonIcon from '../assets/img/unknown person.jpg'
import exitButton from '../assets/img/Icon ionic-ios-close-circle-outline@2x.png'
import workersImage from '../assets/img/Grupo 390@2x.png'
import checkIcon from '../assets/img/Grupo 394@2x.png'
import { NavLink } from 'react-router-dom';
import './style.css';

function SignUpWindow(props) {

  const [image, setImage] = useState(unkownPersonIcon);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleConf, setIsVisibleConf] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [matricula, setMatricula] = useState('');

  const addUser = (event) => {
    event.preventDefault();
    setIsVisible(false);
    setIsVisibleConf(true);
    
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleExitButtonClick = () => {
    setIsVisible(false);
    if (typeof props.onWindowClose === 'function') {
      props.onWindowClose();
    }
  };

  const handleExitConfClick = () => {
    setIsVisibleConf(false);
    if (typeof props.onWindowClose === 'function') {
      props.onWindowClose();
    }
  };
  
  const handleClick1 = (event) => {
    event.preventDefault();
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
  };

  const handleClick2 = (event) => {
    event.preventDefault();
    setIsActive2(true);
    setIsActive1(true)
    setIsActive3(false)
  };

  const handleClick3 = (event) => {
    event.preventDefault();
    setIsActive3(true);
    setIsActive2(false)
    setIsActive1(true)
  };

  const handleCancelClick = (event) => {
    event.preventDefault();
    setNomeCompleto('');
    setMatricula('');
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setImage(unkownPersonIcon)
  };


  return (
    <>
    <div className='entire-screen'>
      {isVisible && (
        <div className="signup-window">
          <div className="white-half"></div>
          <form className='form-data'>
            <img src={exitButton} className='exit-button' onClick={handleExitButtonClick}></img>
            <div className="image-uploader">
              
              <label htmlFor="file-input">
                <img src={uploadButton} alt="Upload" className='upload-button'/>
              </label>
              <input id="file-input" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>
            <h2 className='form-title'>Adicionar Usuário</h2>
            <div id="myBtnContainer">
              <button className={isActive1 ? 'btn' : 'btn active'} onClick={handleClick1}>Operário</button>
              <button className={isActive2 ? 'btn active' : 'btn'} onClick={handleClick2}>Líder</button>
              <button className={isActive3 ? 'btn active' : 'btn'} onClick={handleClick3}>Supervisor</button>
            </div>
            <div className="form-input">
              <input type="text" placeholder='Nome Completo' value={nomeCompleto} className="form-field" 
              onChange={(event) => setNomeCompleto(event.target.value)} />
            </div>
            <div className="form-input">
              <input type="text" placeholder='Nº de Matrícula' value={matricula} className="form-field" 
              onChange={(event) => setMatricula(event.target.value)} />
            </div>
            <button className='cancel-button' onClick={handleCancelClick}>Cancelar</button>
            <button type="submit" className='submit-button' onClick={addUser}>Adicionar Usuário</button>
          </form>
        </div>
      )}
      {isVisibleConf && (
        <div className='confirmation-window'>
          <div className="white-half"></div>
          <div className='white-circle'></div>
          <img src={exitButton} className='exit-button-confirm' onClick={handleExitConfClick}></img>
          <img src={checkIcon} className='check-icon'></img>
          <h2 className='confirmation-title'>Usuário Adicionado!</h2>
          <img src={workersImage} className='workers-image'></img>
          <NavLink to={"/"}>
          <button className="back-initialpage-button">Voltar à página inicial</button>
          </NavLink>
        </div>
      )}
      </div>
    </>
  );
}

export default SignUpWindow;
