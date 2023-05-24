import React, { useState } from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { EmployeeService } from '../../services/employee_service';
import { LeaderService } from '../../services/leader_service';
import { SupervisorService } from '../../services/supervisor_service';
import { DeleteEmployee } from '../../use_cases/employees/Delete';
import { DeleteLeader } from '../../use_cases/leaders/Delete';
import { DeleteSupervisor } from '../../use_cases/supervisors/Delete';
import './style.css';

function VerticalList ({ links }) {

  const deleteEmployee = new DeleteEmployee(new EmployeeService());
  const deleteLeader = new DeleteLeader(new LeaderService());
  const deleteSupervisor = new DeleteSupervisor(new SupervisorService());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState('');
  const [roleDelete, setRoleDelete] = useState('');
   
  const handleDeleteClick = (event, id) => {
    event.preventDefault();
    setEmployeeIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDeleteClick = async () => {
    if (roleDelete === 'Operário')
      await deleteEmployee.execute(employeeIdToDelete);
    else if (roleDelete === 'Líder')
      await deleteLeader.execute(employeeIdToDelete);
    else if (roleDelete === 'Gerente')
      await deleteSupervisor.execute(employeeIdToDelete);
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
          <a href="#" key={index} >
            <div className='image-area'>
            <img className="circle" src={link[1]}></img>
            </div>
            <div className='name-area'>
            <span>{link[0]}</span>
            </div>
            <div className="enrollment-area">
              <span>{link[2]}</span>
            </div>
            <div className="permission-area">
              <span>{link[3]}</span>
            </div>
            <div className='trashCan-icon-area'>
              <BsTrash3Fill key={link[4]} className='trashCan-icon' onClick={(e) => {handleDeleteClick(e, link[4]), setRoleDelete(link[3])}}></BsTrash3Fill>
            </div>
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
