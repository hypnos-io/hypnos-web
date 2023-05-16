import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import HeaderRectangle from '../../components/HeaderRectangle'
import VerticalList from '../../components/VerticalList'
import GrayRectBackground from '../../components/GrayRectBackground'
import SearchBar from '../../components/SearchBar'
import AddUserButton from '../../components/AddUserButton'
import awesomeUsersDark from '../../components/assets/img/Icon awesome-users-black@2x.png'
import SignUpWindow from '../../components/SignUpWindow'
import { FetchAllEmployees } from '../../use_cases/employees/FetchAll';
import { FetchAllLeaders } from '../../use_cases/leaders/FetchAll'
import { EmployeeService } from '../../services/employee_service';
import './style.css'
import { LeaderService } from '../../services/leader_service'
import { SupervisorService } from '../../services/supervisor_service'
import { FetchAllSupervisors } from '../../use_cases/supervisors/FetchAll'

const SignUpPage: React.FC = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [foundOperators, setFoundOperators] = useState<(string | undefined)[][]>([]);
  const [allOperators, setAllOperators] = useState(foundOperators);

  const handleFilter = (searchTerm) => {
    if (searchTerm === '') {
      setFoundOperators(allOperators);
      return;
    }

    const filteredOperators = allOperators.filter((operator) =>
      operator[0]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoundOperators(filteredOperators);
  };

  const handleAddUserClick = () => {
    setShowWindow(true);
    setBlurBackground(true);
  };

  const handleWindowClose = () => {
    setShowWindow(false);
    setBlurBackground(false);
  };

  useEffect(() => {
    async function getUsers() {
      const employers = await new FetchAllEmployees(new EmployeeService()).execute();
      const leaders = await new FetchAllLeaders(new LeaderService()).execute();
      const supervisors = await new FetchAllSupervisors(new SupervisorService()).execute();
  
      const employersList = employers.map(obj => {
        let roleString = '';
        switch (obj.role) {
          case 0:
            roleString = 'Operário';
            break;
          case 1:
            roleString = 'Gerente';
            break;
          case 2:
            roleString = 'Líder';
            break;
          default:
            roleString = 'Operário';
        }
        return [obj.fullName, obj.imageURL, obj.registration, roleString, obj._id];
      });
  
      const leadersList = leaders.map(obj => {
        let roleString = '';
        switch (obj.role) {
          case 0:
            roleString = 'Operário';
            break;
          case 1:
            roleString = 'Gerente';
            break;
          case 2:
            roleString = 'Líder';
            break;
          default:
            roleString = 'Operário';
        }
        return [obj.fullName, obj.imageURL, obj.registration, roleString, obj._id];
      });
  
      const supervisorsList = supervisors.map(obj => {
        let roleString = '';
        switch (obj.role) {
          case 0:
            roleString = 'Operário';
            break;
          case 1:
            roleString = 'Gerente';
            break;
          case 2:
            roleString = 'Líder';
            break;
          default:
            roleString = 'Operário';
        }
        return [obj.fullName, obj.imageURL, obj.registration, roleString, obj._id];
      });
  
      // Merge the three lists into a single list
      const mergedList = employersList.concat(leadersList, supervisorsList);
  
      setFoundOperators(mergedList);
      setAllOperators(mergedList);
    }
  
    getUsers();
  }, []);
  

  return (
    <div className="signUpPage">
      <div className={`page-content ${blurBackground ? "blur" : ""}`}>
        <Sidebar></Sidebar>
        {blurBackground && <div className='shadow'></div>}
        <h1 className="upper-title">Cadastros</h1>
        <img className="awesome-users-icon" src={awesomeUsersDark} alt="Awesome Users Icon"></img>
        <h2 className="column-title-name">Nome</h2>
        <h2 className="column-title-enrollment">Matrícula</h2>
        <h2 className="column-title-permissions">Permissões</h2>
        <h2 className="column-title-actions">Ações</h2>
        <GrayRectBackground></GrayRectBackground>
        <HeaderRectangle></HeaderRectangle>
        <SearchBar onSearch={handleFilter} />
        <VerticalList links={foundOperators}/>
        <AddUserButton text="Adicionar Usuário" onClick={handleAddUserClick}></AddUserButton>
      </div>
      {showWindow && <SignUpWindow onWindowClose={handleWindowClose} />}
    </div>
  );
};

export default SignUpPage;



