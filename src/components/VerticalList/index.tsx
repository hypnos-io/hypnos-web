import React, { useState } from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { EmployeeService } from '../../services/employee_service';
import { Delete } from '../../use_cases/employees/Delete';
import './style.css';

function VerticalList ({ links }) {

  const deleteEmployee = new Delete(new EmployeeService());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState('');
   
  const handleDeleteClick = (event, id) => {
    event.preventDefault();
    setEmployeeIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDeleteClick = async () => {
    await deleteEmployee.execute(employeeIdToDelete);
    window.location.reload();
    setShowConfirmation(false);
  };

  const handleCancelDeleteClick = () => {
    setShowConfirmation(false);
  };
  
  return (
    <div>
      <div className="vertical-list">
        {links.map((link, index) => (
          <a href="#" key={index}>
            <img className="circle" src={link[1]}></img>
            <span className="link-text">{link[0]}</span>
            <div className="link-enrollment">
              <span>{link[2]}</span>
            </div>
            <div className="link-permissions">
              <span>{link[3]}</span>
            </div>
            <BsTrash3Fill key={link[4]} className='trashCan-icon' onClick={(e) => handleDeleteClick(e, link[4])}></BsTrash3Fill>
          </a>
        ))}
      </div>
      {showConfirmation && (
        <div className="confirmation-box">
          <p className='title-confirmation-deleting'>Deseja excluir esse usuário?</p>
          <div className='white-half'>
          <div className="confirmation-buttons">
            <button onClick={handleConfirmDeleteClick} className='exclude-button'>Excluir</button>
            <button onClick={handleCancelDeleteClick} className='cancel-delete-button'>Cancelar</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerticalList;
