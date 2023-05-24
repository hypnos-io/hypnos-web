import React from 'react'
import './style.css'

function HeaderRectangle () {
    return (
       <div>
         <div className='rectangle'>
          <div className='column-title-name'>
            Nome
          </div>
          <div className='column-title-enrollment'>
             Matrícula
          </div>
          <div className='column-title-permissions'>
             Permissões
          </div>
          <div className='column-title-actions'>
            Ações
          </div>
         </div>
       </div>

    )
}

export default HeaderRectangle