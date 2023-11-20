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
    <div>
      <label htmlFor="task">Ingresar nueva tarea:  </label>
      <input
        type="text"
        id="task"
        value={task}
        onChange={handleInputChange}
      /> 
      <button onClick={handleAddTask}>Agregar Tarea</button>
    </div>
  );
};

export default MenuForm;
