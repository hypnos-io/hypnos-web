import {useState} from 'react'
import searchIcon from '../assets/img/Icon ionic-ios-search@2x.png'
import './style.css'

function SearchBar({onSearch}) {
  const [query, setQuery] = useState('')

  const handleInputChange = (event) => {
    setQuery(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <div className="generic-search-bar">
      <div className="icon-space">
      <img className="search-icon" src={searchIcon}></img>
      </div>
      <input
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default SearchBar
