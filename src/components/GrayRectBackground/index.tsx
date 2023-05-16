import React from 'react'
import { GrRefresh } from 'react-icons/gr'
import './style.css'

function GrayRectBackground() {

    const handleRefreshClick = (event) => {
        event.preventDefault();
        window.location.reload();
    }
    
    return (
        <div>
         <div className='backRectangle'>
         </div>
         <GrRefresh className='refresh-icon' onClick={handleRefreshClick}></GrRefresh>
       </div>
    )
}

export default GrayRectBackground;