import React from 'react';
import './style.css';

function VerticalList ({ links }) {
  return (
    <div>
      <div className="vertical-list">
        {links.map((link, index) => (
          <a href="#" key={index}>
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}

export default VerticalList;

