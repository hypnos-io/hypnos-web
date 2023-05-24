import React from 'react'
import './style.css'

function HeaderRectangle ({hideCenterTitles = false}) {


    return (
       <div>
         <div className='rectangle'>
          <div className='column-title-name'>
            Nome
          </div>
          <div className='column-title-enrollment'>
             <p style={{color: !hideCenterTitles ? '#FFFFFF': 'transparent'}}>Matrícula</p>
          </div>
          <div className='column-title-permissions'>
             <p style={{color: !hideCenterTitles ? '#FFFFFF': 'transparent'}}>Permissões</p>
          </div>
          <div className='column-title-actions'>
            Ações
          </div>
         </div>
       </div>

    )
}

export default HeaderRectangle