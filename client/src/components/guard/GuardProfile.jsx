import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getToDosById,
  getUsersById,
  filterTaskByIdAndStatus,
  updateStatus,
} from "../../redux/actions";
import './styles.css'

export default function GuardProfile() {
  const ToDos = useSelector((state) => state.todosId);
  const user = useSelector((state) => state.userDetails);
  const updatedTask = useSelector((state) => state.todoUpdate);
  const dispatch = useDispatch();
  const { id } = useParams();

    const [currentState, setCurrentState] = useState("All")

  useEffect(() => {
    dispatch(getUsersById(id));
    dispatch(getToDosById(id));
  }, [dispatch]);

  useEffect(() => {
      dispatch(getToDosById(id));

    if(currentState !== "All"){
        dispatch(filterTaskByIdAndStatus(id,currentState))
    }

  }, [updatedTask]);

  const tareas = (e) => {
    dispatch(filterTaskByIdAndStatus( id, e.target.value,));
    setCurrentState(e.target.value)
  };

  const updateTaskStatus = (e) => {
    dispatch(updateStatus(e.target.id, { status: e.target.value }));
  };

  return (
    <div className="screen-tasks">
      


      <div className="contenedor_tareas">
        <div className="head-tasks">
          <h2 className="list-tasks">Lista de tareas</h2>
          <div className="filter">
            <span>Filtrar Tareas: </span>
            <select onChange={(e) => tareas(e)}>
              <option disabled defaultValue>
                Seleccionar estado de tarea
              </option>
              <option value="done">Realizadas</option>
              <option value="left">Pendientes</option>
              <option value="postponed">Postergadas</option>
            </select>
          </div>
        </div>
        
        {ToDos?.map((todo, i) => (
          <div key={i} className="tasks">

            <div className="info-task">
              <h3><span className="title">title:</span> {todo.name}</h3>
              <p><span className="title">description:</span> {todo.description}</p>
              <button>Adjuntar Imagen y Comentario</button>
            </div>

            <div className="status-task">
              <p className={`${todo.status} status`} >{todo.status}</p>
              <span className="title-priority"><span className="title">Prioridad:</span> <span className={`${todo.priority} priority`}>{todo.priority}</span></span>
              <div className="buttons">
                <button
                  value="done"
                  id={todo._id}
                  onClick={(e) => updateTaskStatus(e)}
                >
                  Terminado
                </button>

                {todo.status === "done" ? (
                  <button disabled>Postergar</button>
                ) : (
                  <button
                    value="postponed"
                    id={todo._id}
                    onClick={(e) => updateTaskStatus(e)}
                  >
                    Postergar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
