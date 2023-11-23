import React, { useState, useEffect } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import TaskForm from '../TaskForm/TaskForm';
import './TaskList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';




const TaskList = () => {
  const [options, setOptions] = useState([]);
  
  // Cargar tareas desde localStorage al montar el componente
  useEffect(() => {
    const storedOptions = JSON.parse(localStorage.getItem('tasks')) || [];
    setOptions(storedOptions);
  }, []);

  const saveOptionsToLocalStorage = (newOptions) => {
    localStorage.setItem('tasks', JSON.stringify(newOptions));
  };

  
  const handleToggleStatus = (index) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = { ...newOptions[index], completa: !newOptions[index].completa };
      saveOptionsToLocalStorage(newOptions);
      return newOptions;
    });
  };

  const handleClickButton = (index, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!options[index].completa) {
      // Solo muestra la alerta cuando se elimina una tarea incompleta
      alert(`Tarea incompleta eliminada: ${options[index].name}`);
    }

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions.splice(index, 1);
      saveOptionsToLocalStorage(newOptions);
      return newOptions;
    });
  };

  const handleAddTask = (newTask) => {
    const newOptions = [...options, { name: newTask, completa: false }];
    setOptions(newOptions);
    saveOptionsToLocalStorage(newOptions);
    // Muestra una alerta cuando se agrega una tarea
    alert(`Nueva tarea agregada: ${newTask}`);
  };

  return (
    <div className='container'>
      <h1>Gestión de tareas</h1>
      <TaskForm onAddTask={handleAddTask} />
      <h2 className='section3'>Tareas:</h2>
      <ul id="columas" className='col3'>
        {options.map((option, index) => (
          <li key={index} className='section4 row'>
            <div className='col-md-8'>
              <TaskItem
                name={option.name}
                index={index}
                completa={option.completa}
              />
            </div>
            <div className='col-md-4'>
              <button onClick={() => handleToggleStatus(index)}> {option.completa ? 'Incompleto' : ''}
                <FontAwesomeIcon icon={faCheck} style={{ color: '#ffffff' }} />
              </button>
              <button onClick={(e) => handleClickButton(index, e)}>
                <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}}/>
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
