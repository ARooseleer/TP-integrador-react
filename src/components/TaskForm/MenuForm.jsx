import React, { useState } from 'react';
import './MenuForm.css'
const MenuForm = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <div className='section2'>
      <label htmlFor="task">Ingrese su tarea:  </label>
      <br />
      <input
        type="text"
        id="task"
        value={task}
        onChange={handleInputChange}
      /> 
      <button onClick={handleAddTask} className='btn-add'>Agregar Tarea</button>
    </div>
  );
};

export default MenuForm;
