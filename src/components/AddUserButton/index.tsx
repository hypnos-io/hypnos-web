import React from 'react';
import userPlusIcon from '../assets/img/Icon awesome-user-plus@2x.png'
import './style.css';

function AddUserButton({ text, onClick }) {
  return (
    <button className="add-user-button" onClick={onClick}>
      <img className="user-plus-icon" src={userPlusIcon}></img>
      <span>{text}</span>
    </button>
  );
}

export default AddUserButton;
