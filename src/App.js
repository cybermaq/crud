import { isEmpty, size } from 'lodash';
import { nanoid } from 'nanoid';
import {React, useState} from 'react';

function App() {
  const [tarea, setTarea] = useState("")
  const [tareas, setTareas] = useState([])
  const [editar, setEditar] = useState(false)
  const [id, setId] = useState("")
  const [errores, setErrores] = useState(null)


  const validForm = () => {
    let isValid =  true;
    setErrores(null);
    if (isEmpty(tarea)) {
      setErrores("Debes ingresar tarea");
      isValid = false;
    }
    return isValid;
  }


  const addTarea = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return
    }

    const newTarea = {
      id: nanoid(),
      name: tarea
    }

    setTareas([...tareas, newTarea]);
    setTarea("");
  }


  const deleteTarea = (id) => {
    const tareasFiltrado = tareas.filter(tarea => tarea.id !== id );
    setTareas(tareasFiltrado)
  }


  const editTarea = (tarea) => {
    setTarea(tarea.name);
    setEditar(true);
    setId(tarea.id);
  }


  const updateTarea = (e) => {
    setEditar(false);
    e.preventDefault();

    if (!validForm()) {
      return
    }

    const editadoTareas = tareas.map(
      item => item.id === id ?
      {id, name: tarea}: item
    )
    setTareas(editadoTareas);
    setTarea("");
    setId("");
  }

  return (
  <div className='container mt-5'>
    <div className='row'>
      <h1 className='text-center'>
        Tareas
      </h1>
      <hr/>
      <div className='col-8'>
      <h4 className='text-center'>Listado de tareas</h4>
      {
        size(tareas) == 0 ? (
          <li className='list-group-item'>No hay tareas para mostrar</li>
        ) : (
          <ul className='list-group'>
            { tareas.map((d)=>(
              <li className='list-group-item' key={d.id}>
                <span> {d.name} </span>
                <button
                  type="button"
                  className='btn btn-danger btn-sm float-end'
                  onClick={() => deleteTarea(d.id)}>
                    Eliminar</button>
                <button
                  type="button"
                  className='btn btn-warning btn-sm float-end mx-2'
                  onClick={() => editTarea(d)}>
                    Modificar</button>
              </li>
            ))
            }
          </ul>
        )
      }
      </div>
      <div className='col-4'>
        <h3 className='text-center'>
          {editar ? "Modificar tarea": "Agregar tarea"}
        </h3>
        <form onSubmit={editar ? updateTarea: addTarea}>
            {
              errores && <span className='text-danger'>{errores}</span>
            }
            <input
              type="text"
              placeholder='ingrese nombre...'
              className='form-control mb-2'
              onChange={(text) => setTarea(text.target.value)}
              value={tarea}/>
            <div className="d-grid gap-1">
              <button
                type="submit"
                className={editar? 'btn btn-warning': 'btn btn-dark'}>
              {editar ? "Modificar": "Registrar"}
              </button>
            </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;
