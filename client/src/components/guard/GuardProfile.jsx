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
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('')
  const uploadImage = async (e) => {
      const files = e.target.files;
      const data = new FormData();
  
      data.append('file', files[0]);
      data.append('upload_preset', 'magqqp6o');
     
      setLoading(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload", { method: "POST", body: data })
      const file = await res.json();
      
      setImage(file.secure_url);
      setLoading(false)
  };

  const ToDos = useSelector((state) => state.todosId);
  const updatedTask = useSelector((state) => state.todosId);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [ active, setActive ] = useState(false);
  const [ currentPriority, setCurrentPriority ] = useState("all");
  const [ currentStatus, setCurrentStatus ] = useState("all");

  const toggle = ()=>{
    setActive(!active);
    setImage('')
  }

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
      <Modal active={active} toggle={toggle}>
        <div style={style.modal}>
          <label>Your comment:</label>
          <textarea className={Input()} placeholder="Comentario sobre la tarea..."></textarea>
            <input className={File} type="file" name="file" onChange={uploadImage}></input>
            {loading ? (<p>...Loading</p>) : (<img src={image} alt="Nothing has been uploaded." style={style.img}/>)}
          <button className={Button()}>Send</button>
        </div>
      </Modal>
    </div>
  );
}

const style = {
  modal: {
    display:'flex',
    flexDirection: 'column',
    margin: '5px'
  },
  img: {
    width :'100px',
    heigth: '100px'
  }
}

const Input = (props) => `
    hover:bg-slate-100
    placeholder:italic placeholder:text-slate-400 
    block bg-white w-${props === 'Select' ? '32' : '96'} m-2.5
    border border-slate-300 rounded-md 
    py-2 pl-9 pr-3 shadow-sm 
    focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 
    sm:text-sm
`;

const Button = () => `
    font-bold text-white
    bg-blue-500
    w-32 h-10 p-0 mt-3
    border-2 border-blue-500
    hover:border-blue-600 hover:bg-blue-600
    active:border-blue-700 active:bg-blue-700
    rounded-3xl
`;

const File = `
    block w-full text-sm text-slate-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100
`;
