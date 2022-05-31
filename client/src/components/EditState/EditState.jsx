import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getToDosById,
  filterByPriority,
  filterByStatus,
  filterByStatusAndPriority,
  updateStatus,
} from "../../redux/actions";

export default function EditState() {
  const ToDos = useSelector((state) => state.todosId);
  const user = useSelector((state) => state.userDetails);
  const updatedTask = useSelector((state) => state.todoUpdate);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [ currentPriority, setCurrentPriority ] = useState("all");
  const [ currentStatus, setCurrentStatus ] = useState("all");

  useEffect(() => {
    dispatch(getToDosById(id));
  }, [dispatch]);

  useEffect(() => {
    if (currentPriority === "all" && currentStatus !== "all") {
      dispatch(filterByStatus(id, currentStatus));
    } else if (currentPriority !== "all" && currentStatus !== "all") {
      dispatch(filterByStatusAndPriority(id, currentStatus, currentPriority));
    } else if (currentPriority !== "all" && currentStatus === "all") {
      dispatch(filterByPriority(id, currentPriority));
    } else {
      dispatch(getToDosById(id));
    }
    setCurrentStatus(currentStatus);
  }, [updatedTask]);

  const priorityManager = (e) => {
    let priority = e.target.value;
    if (priority === "all" && currentStatus !== "all") {
      dispatch(filterByStatus(id, currentStatus));
    } else if (priority !== "all" && currentStatus !== "all") {
      dispatch(filterByStatusAndPriority(id, currentStatus, priority));
    } else if (priority !== "all" && currentStatus === "all") {
      dispatch(filterByPriority(id, priority));
    } else {
      dispatch(getToDosById(id));
    }
    setCurrentPriority(priority);
  };

  const statusManager = (e) => {
    let status = e.target.value;
    if (currentPriority === "all" && status !== "all") {
      dispatch(filterByStatus(id, status));
    } else if (currentPriority !== "all" && status !== "all") {
      dispatch(filterByStatusAndPriority(id, status, currentPriority));
    } else if (currentPriority !== "all" && status === "all") {
      dispatch(filterByPriority(id, currentPriority));
    } else {
      dispatch(getToDosById(id));
    }
    setCurrentStatus(status);
  };

  const updateTaskStatus = (e) => {
    dispatch(updateStatus(e.target.id, { status: e.target.value }));
  };

  return (
    <div className="flex-column bg-[#EDF6FE] m-auto w-4/5 mt-6">
      <div className="flex justify-between text-base gap-3 mr-3 pt-3 text-gray-500">
        <Link to={`/guard/${id}`} className="flex">
          <button className="rounded-lg border-solid border-2 border-inherit mr-2 hover:bg-cyan-200 ml-3">
            <h2>Go Back</h2>
          </button>
        </Link>
        <div className="priorityFilter">
            <select onChange={(e) => priorityManager(e)}>
            <option value="0" hidden>Filter by priority</option>
              <option value="all">All</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="regular">Regular</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="statusFilter">
            <select onChange={(e) => statusManager(e)}>
            <option value="0" hidden>Filter by status</option>
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="left">Left</option>
              <option value="postponed">Postponed</option>
            </select>
          </div>
      </div>

      <h2 className="flex justify-center text-xl text-gray-500">
        Lista de tareas:{" "}
      </h2>
      <div className="flex flex-wrap gap-7 w-4/5 mx-20">
        {ToDos?.map((todo, i) => (
          <div className="max-w-sm w-full lg:max-w-full lg:flex justify-between border-solid border-2 border-inherit rounded-2xl justify-center items-center px-7 py-3 gap-3 shadow-lg">
            <div key={i}>
              <h3>
                {" "}
                <span className="text-gray-500 text-lg font-bold">
                  Titulo:
                </span>{" "}
                {todo.name}
              </h3>
              <p>
                {" "}
                <span className="text-gray-500 text-lg font-bold">
                  Descripcion:
                </span>{" "}
                {todo.description}
              </p>
              <span>Prioridad: </span>
              <span>{todo.priority}</span>
              <button className="rounded-lg border-solid border-2 border-inherit ml-2 hover:bg-cyan-200">
                Adjuntar Imagen y Comentario
              </button>
              {/* {beenClicked===1?<p>vuelva a presinar el boton para confirmar</p>:null} */}
              <div className="mt-3">
                <button
                  className="rounded-lg border-solid border-2 border-inherit mr-2 hover:bg-cyan-200"
                  value="done"
                  id={todo._id}
                  onClick={(e) => updateTaskStatus(e)}
                >
                  Terminado
                </button>
                {todo.status === "done" ? (
                  <button
                    disabled
                    className="rounded-lg border-solid border-2 border-inherit mr-2 bg-gray-200 text-gray-500 active:bg-gray-200"
                  >
                    Postergar
                  </button>
                ) : (
                  <button
                    className="rounded-lg border-solid border-2 border-inherit mr-2 hover:bg-cyan-200"
                    value="postponed"
                    id={todo._id}
                    onClick={(e) => updateTaskStatus(e)}
                  >
                    Postergar
                  </button>
                )}
              </div>
            </div>
            <div>
              {todo.status === "done" ? (
                <p className="bg-[#D8F7E6] text-[#006D64] px-2 py-0.5 rounded-lg text-lg shadow-lg">
                  {todo.status}
                </p>
              ) : todo.status === "postponed" ? (
                <p className="bg-[#FFEFE4] text-[#EF5F0A] p-1 rounded-lg text-lg shadow-lg">
                  {todo.status}
                </p>
              ) : (
                <p className="bg-[#FFE5E8] text-[#DB041A] p-1 rounded-lg text-lg shadow-lg">
                  {todo.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
