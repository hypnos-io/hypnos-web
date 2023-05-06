import React, { useState } from 'react';
import uploadButton from '../assets/img/Grupo 618@2x.png'
import unkownPersonIcon from '../assets/img/unknown person.jpg'
import exitButton from '../assets/img/Icon ionic-ios-close-circle-outline@2x.png'
import './style.css';

function SignUpWindow(props) {
  const [image, setImage] = useState(unkownPersonIcon);
  const [isVisible, setIsVisible] = useState(true);

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

  return (
    <>
      {isVisible && (
        <div className="signup-window">
          <div className="green-half"></div>
          <form className='form-data'>
            <img src={exitButton} className='exit-button' onClick={() => {handleExitButtonClick()}}></img>
            <div className="image-uploader">
              {image && <img src={image} alt="Uploaded" className="uploaded-image"/>}
              <label htmlFor="file-input">
                <img src={uploadButton} alt="Upload" className='upload-button'/>
              </label>
              <input id="file-input" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>
            <div className="form-input">
              <input type="text" placeholder='Nome Completo'className="form-field" />
            </div>
            <div className="form-input">
              <input type="text" placeholder='Nº de Matrícula'className="form-field" />
            </div>
            <button className='cancel-button'>Cancelar</button>
            <button type="submit" className='submit-button'>Adicionar Usuário</button>
          </form>
        </div>
      )}
    </>
  );
}

export default SignUpWindow;
