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
  const [showWindow, setShowWindow] = useState(false); // Add state to track whether or not to show the window

  const [foundOperators, setFoundOperators] = useState(['João', 'Maria', 'Pedro', 'Reinaldo']);
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
    setShowWindow(true); // Set state to show the window when the button is clicked
  };

  return (
    <div className="signUpPage">
      <Sidebar></Sidebar>
      <h1 className="upper-title">Cadastros</h1>
      <img className="awesome-users-icon" src={awesomeUsersDark} alt="Awesome Users Icon"></img>
      <h2 className="column-title-name">Nome</h2>
      <h2 className="column-title-enrollment">Matrícula</h2>
      <GrayRectBackground></GrayRectBackground>
      <HeaderRectangle></HeaderRectangle>
      <SearchBar onSearch={handleFilter} />
      <VerticalList links={foundOperators} />
      <AddUserButton text="Adicionar Usuário" onClick={handleAddUserClick}></AddUserButton>
      {showWindow && <SignUpWindow onWindowClose={() => setShowWindow(false)} />}
    </div>
  );
};

export default SignUpPage;