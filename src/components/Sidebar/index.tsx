import fatigueIcon from '../assets/img/Grupo 293@2x.png'
import backIcon from '../assets/img/Icon open-account-logout@2x.png'
import NavButton from './NavButton'
import './style.css'

function Sidebar() {
  return (
    <div className="Sidebar__container">
      <div className="Sidebar__content">
        <div className="Sidebar__header">
          <img src="https://images.unsplash.com/photo-1592948078640-39656341be54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
          <div className="Sidebar__greeting__container">
            <h1>
              Olá,
              <br />
              Ana Maria
            </h1>
            <p>Líder</p>
          </div>
        </div>
        <div className="Sidebar__buttons__container">
          <div className="Sidebar__navbuttons__container">
            <NavButton path="/" icon={fatigueIcon}>
              Detecção de Fadiga
            </NavButton>
            <NavButton path="/image-capture" icon={fatigueIcon}>
              Iniciar captura de imagem
            </NavButton>
          </div>
          <NavButton path="/logout" icon={backIcon}>
            Sair
          </NavButton>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
