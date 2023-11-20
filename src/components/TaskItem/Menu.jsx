import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ name, onTaskComplete, index, completa }) => {
  const [status, setStatus] = useState(completa ? 'completo' : 'incompleto');

  const handleToggleStatus = () => {
    const newStatus = status === 'incompleto' ? 'completo' : 'incompleto';
    setStatus(newStatus);
    onTaskComplete(index, { completa: newStatus === 'completo' });
  };

  return (
    <div className="menu-item">
      <p style={{ marginRight: '10px', textDecoration: status === 'completo' ? 'line-through' : 'none' }}>
        {name}
      </p>
      <button onClick={handleToggleStatus}>
        {status === 'incompleto' ? 'Marcar como Completo' : 'Marcar como Incompleto'}
      </button>
    </div>
  );
};

export default Menu;
