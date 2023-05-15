import React, { useState, useEffect, ReactNode } from 'react';
import uploadButton from '../assets/img/Grupo 618@2x.png'
import unkownPersonIcon from '../assets/img/unknown person.jpg'
import exitButton from '../assets/img/Icon ionic-ios-close-circle-outline@2x.png'
import workersImage from '../assets/img/Grupo 390@2x.png'
import checkIcon from '../assets/img/Grupo 394@2x.png'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Create } from '../../use_cases/employees/Create';
import { EmployeeService } from '../../services/employee_service';
import { RolesEnum } from '../../use_cases/authorization/roles';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { VITE_DEFAULT_PROFILE_IMAGE } from '../../constants';
import './style.css';

function SignUpWindow(props) {
  
  const [imageFile, setImageFile] = useState('');
  const [image, setImage] = useState(unkownPersonIcon);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleConf, setIsVisibleConf] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const defaultImageURL = `${VITE_DEFAULT_PROFILE_IMAGE}`

  async function addUser (event) {
    event.preventDefault();
    const error = await validateForm();

    if (error.length < 1)
    {
      setIsVisible(false);
      setIsVisibleConf(true);
      const add_employ = new Create(new EmployeeService());
      let image_upload = await add_employ.uploadImg(imageFile);
      if (imageFile === '')
        image_upload = defaultImageURL;
      const role_number = await roleToEnum()
      const signup_user = await add_employ.execute(matricula, nomeCompleto, senha, new Date(), role_number, image_upload);
    }
    else
      alert(error)

  };

  async function roleToEnum () {
    if (role == 'Operator')
    {
      return RolesEnum.EMPLOYEE;
    }
    else if (role == 'manager')
    {
      return RolesEnum.SUPERVISOR;
    }
    else 
      return RolesEnum.LEADER;
  };

  async function validateForm() {
  
    // validate the name field
    if (nomeCompleto.length < 1) {
      return 'O nome completo é obrigatório'
    }
  
    // validate the matricula field
    else if (matricula.length < 1) {
      return 'O número de matrícula é obrigatório'
    
    } 

    // validate the senha field
    else if (senha.length < 1) {
      return 'A senha é obrigatória'
    
    } 
    else if (senha.length < 6) {
      return 'A senha deve ter pelo menos 8 caracteres'
      
    }
    else if (!/\d/.test(senha)) {
      return "A senha deve conter ao menos um número"
     
    }

    // validate the role field
    else if (role.length < 1) {
      return 'A função é obrigatória'
    }
  
    return ""
  }  


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(unkownPersonIcon);
    console.log(file);
    setImageFile(file);
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

  const handleCancelClick = (event) => {
    event.preventDefault();
    setNomeCompleto('');
    setMatricula('');
    setImage(unkownPersonIcon)
  };

  const handleRadioChange = async (event) => {
    setSelectedRole(event.target.value);
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
            {image && <img src={image} alt="Uploaded" className="uploaded-image"/>}
              <label htmlFor="file-input">
                <img src={uploadButton} alt="Upload" className='upload-button'/>
              </label>
              <input id="file-input" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>
            <h2 className='form-title'>Adicionar Usuário</h2>
            <div id="myBtnContainer">
            </div>
            <div className="form-input">
              <input type="text" placeholder='Nome Completo' value={nomeCompleto} className="form-field" 
              onChange={(event) => setNomeCompleto(event.target.value)} />
            </div>
            <div className="form-input">
              <input type="text" placeholder='Nº de Matrícula' value={matricula} className="form-field" 
              onChange={(event) => setMatricula(event.target.value)} />
            </div>
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            className="form-field"
            onChange={(event) => setSenha(event.target.value)}
          />
          {!showPassword && <BsFillEyeFill
            className="password-eye"
            onClick={() => setShowPassword(true)}
          >
          </BsFillEyeFill>}
          {showPassword && <BsFillEyeSlashFill
            className="password-eye"
            onClick={() => setShowPassword(false)}>
          </BsFillEyeSlashFill>}
            <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              row
              value={role}
              onChange={handleRadioChange}
              className='radio-group-users'>
              <FormControlLabel value="manager" control={<Radio />} label="Gerente" />
              <FormControlLabel value="leader" control={<Radio />} label="Líder" />
              <FormControlLabel value="Operator" control={<Radio />} label="Operário" />
            </RadioGroup>
          </FormControl>
          <button className='cancel-button' onClick={handleCancelClick}>Cancelar</button>
            <button type="submit" className='submit-button' onClick={addUser}>Adicionar Usuário</button>
          </form>
        </div>
      )}
      {isVisibleConf && (
        <div className='confirmation-window'>
          <div className="white-half"></div>
          <div className='white-circle'></div>
          <img src={exitButton} className='exit-button-confirm' onClick={()=> {handleExitConfClick(), window.location.reload()}}></img>
          <img src={checkIcon} className='check-icon'></img>
          <h2 className='confirmation-title'>Usuário Adicionado!</h2>
          <img src={workersImage} className='workers-image'></img>
          <button className="back-initialpage-button" onClick={()=> {handleExitButtonClick(), window.location.reload()}}>Voltar à página inicial</button>
        </div>
      )}
      </div>
    </>
  );
}

export default SignUpWindow;
