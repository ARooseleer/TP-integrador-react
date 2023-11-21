import React, { useState, useEffect } from 'react';
import Menu from '../TaskItem/Menu';
import MenuForm from '../TaskForm/MenuForm';
import './MenuContainer.css';

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
    <div>
      <h1>Ingrese sus tareas</h1>
      <MenuForm onAddTask={handleAddTask} />
      <h1>Tareas:</h1>
      <ul className="col3" id="columas">
        {options.map((option, index) => (
          <li key={index}>
            <Menu
              name={option.name}
              index={index}
              
              completa={option.completa}
              
            />
            <button onClick={() => handleToggleStatus(index)}>
              Marcar como {option.completa ? 'Incompleto' : 'Completo'}
            </button>
            <button onClick={(e) => handleClickButton(index, e)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuContainer;
