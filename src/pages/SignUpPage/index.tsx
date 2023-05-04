import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import HeaderRectangle from '../../components/HeaderRectangle'
import VerticalList from '../../components/VerticalList'
import GrayRectBackground from '../../components/GrayRectBackground'
import SearchBar from '../../components/SearchBar'
import AddUserButton from '../../components/AddUserButton'
import './style.css'

const SignUpPage: React.FC = () => {

  const [foundOperators, setFoundOperators] = useState(['João', 'Maria', 'Pedro', 'Reinaldo']);
  const [allOperators, setAllOperators] = useState(foundOperators)

  const handleFilter = (searchTerm) => {
    if (searchTerm === '') {
      setFoundOperators(allOperators);
      return;
    }

    const filteredLinks = foundOperators.filter((link) =>
      link.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoundOperators(filteredLinks);
    return
  };

  return (
    <div className="signUpPage">
      <Sidebar></Sidebar>
      <h1 className='upper-title'>Cadastros</h1>
      <GrayRectBackground></GrayRectBackground>
      <HeaderRectangle></HeaderRectangle>
      <SearchBar onSearch={handleFilter} />
      <VerticalList links={foundOperators} />
      <AddUserButton text="Adicionar Usuário" onClick={""}></AddUserButton>
    </div>
  )
}

export default SignUpPage