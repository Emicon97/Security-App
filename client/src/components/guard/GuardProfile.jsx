import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getToDosById,
  filterByPriority,
  filterByStatus,
  filterByStatusAndPriority
} from "../../redux/actions";
import Modal from "../reusable/Modal";
import './styles.css'

export default function GuardProfile() {
  

  const ToDos = useSelector((state) => state.todosId);
  const updatedTask = useSelector((state) => state.todosId);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [ currentPriority, setCurrentPriority ] = useState("all");
  const [ currentStatus, setCurrentStatus ] = useState("all");


  useEffect(() => {
    dispatch(getToDosById(id));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line
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

  return (
    <div className="screen-tasks">
      <div className="contenedor_tareas">
        <div className="head-tasks">
          <Link to={`/EditState/${id}`}><button>Edit</button></Link>
          <h2 className="list-tasks">List of Tasks</h2>
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
        
        {ToDos?.map((todo, i) => (
          <div key={i} className="tasks">

            <div className="info-task">

              <h3><span className="title">Title:</span> {todo.name}</h3>
              <p><span className="title">Description:</span> {todo.description}</p>

            </div>

            <div className="status-task">
              <p className={`${todo.status} status`} >{todo.status}</p>
              <span className="title-priority"><span className="title">Priority:</span> <span className={`${todo.priority} priority`}>{todo.priority}</span></span>

            </div>
          </div>
        ))}
        
      </div>
      
    </div>
  );
}

