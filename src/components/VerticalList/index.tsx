import React from 'react';
import './style.css';

function VerticalList ({ links }) {
  return (
    <div>
      <div className="vertical-list">
        {links.map((link, index) => (
          <a href="#" key={index}>
            <div className="circle"></div>
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}

export default VerticalList;
