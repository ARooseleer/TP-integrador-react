import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = ({ name, completa }) => {
  const [status, setStatus] = useState(completa ? 'completo' : 'incompleto');

  useEffect(() => {
    setStatus(completa ? 'completo' : 'incompleto');
  }, [completa]);


  return (
    <div className="menu-item">
      <p style={{ marginRight: '10px', textDecoration: status === 'completo' ? 'line-through' : 'none' }}>
        {name}
      </p>
      
    </div>
  );
};

export default Menu;