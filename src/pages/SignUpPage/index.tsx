import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import HeaderRectangle from '../../components/HeaderRectangle'
import VerticalList from '../../components/VerticalList'
import GrayRectBackground from '../../components/GrayRectBackground'
import SearchBar from '../../components/SearchBar'
import AddUserButton from '../../components/AddUserButton'
import awesomeUsersDark from '../../components/assets/img/Icon awesome-users-black@2x.png'
import SignUpWindow from '../../components/SignUpWindow'
import { FetchAll } from '../../use_cases/employees/FetchAll';
import { EmployeeService } from '../../services/employee_service';
import './style.css'

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
    async function getEmployees() {
      const employers = await new FetchAll(new EmployeeService()).execute();
      const employers_list = employers.map(obj => {
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
        return [obj.fullName, obj.profileImage, obj.registration, roleString, obj._id];
      });
      setFoundOperators(employers_list);
      setAllOperators(employers_list);
    }
    getEmployees();
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



