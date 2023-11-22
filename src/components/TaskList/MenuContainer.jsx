import React, { useState, useEffect } from 'react';
import Menu from '../TaskItem/Menu';
import MenuForm from '../TaskForm/MenuForm';
import './MenuContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';




const MenuContainer = () => {
  const [options, setOptions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Cargar tareas desde localStorage al montar el componente
  useEffect(() => {
    const storedOptions = JSON.parse(localStorage.getItem('tasks')) || [];
    setOptions(storedOptions);
  }, []);

  const saveOptionsToLocalStorage = (newOptions) => {
    localStorage.setItem('tasks', JSON.stringify(newOptions));
  };

  const handleEditOption = (index, updatedOption) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = { ...newOptions[index], ...updatedOption };
      saveOptionsToLocalStorage(newOptions);
      return newOptions;
    });
    setEditIndex(null);
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
      <MenuForm onAddTask={handleAddTask} />
      <h2 className='section3'>Tareas:</h2>
      <ul id="columas" className='col3'>
        {options.map((option, index) => (
          <li key={index} className='section4 row'>
            <div className='col-md-8'>
              <Menu
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

export default MenuContainer;
