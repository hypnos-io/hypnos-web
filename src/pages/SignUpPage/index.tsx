import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import HeaderRectangle from '../../components/HeaderRectangle'
import VerticalList from '../../components/VerticalList'
import GrayRectBackground from '../../components/GrayRectBackground'
import SearchBar from '../../components/SearchBar'
import AddUserButton from '../../components/AddUserButton'
import awesomeUsersDark from '../../components/assets/img/Icon awesome-users-black@2x.png'
import SignUpWindow from '../../components/SignUpWindow'
import './style.css'

const SignUpPage: React.FC = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [foundOperators, setFoundOperators] = useState(['João', 'Maria', 'Pedro', 'Reinaldo', 'João', 'Maria', 'Pedro', 'Reinaldo',
  'João', 'Maria', 'Pedro', 'Reinaldo',]);
  const [allOperators, setAllOperators] = useState(foundOperators);

  const handleFilter = (searchTerm) => {
    if (searchTerm === '') {
      setFoundOperators(allOperators);
      return;
    }

    const filteredLinks = foundOperators.filter((link) =>
      link.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoundOperators(filteredLinks);
    return;
  };

  const handleAddUserClick = () => {
    setShowWindow(true);
    setBlurBackground(true);
  };

  const handleWindowClose = () => {
    setShowWindow(false);
    setBlurBackground(false);
  };

  return (
    <div className="signUpPage">
      <div className={`page-content ${blurBackground ? "blur" : ""}`}>
        <Sidebar></Sidebar>
        {blurBackground && <div className='shadow'></div>}
        <h1 className="upper-title">Cadastros</h1>
        <img className="awesome-users-icon" src={awesomeUsersDark} alt="Awesome Users Icon"></img>
        <h2 className="column-title-name">Nome</h2>
        <h2 className="column-title-enrollment">Matrícula</h2>
        <GrayRectBackground></GrayRectBackground>
        <HeaderRectangle></HeaderRectangle>
        <SearchBar onSearch={handleFilter} />
        <VerticalList links={foundOperators} />
        <AddUserButton text="Adicionar Usuário" onClick={handleAddUserClick}></AddUserButton>
      </div>
      {showWindow && <SignUpWindow onWindowClose={handleWindowClose} />}
    </div>
  );
};

export default SignUpPage;


