import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { addTaskToUser } from "../../redux/actions";
import { Primary, Input } from "../styles/Buttons";
import LoginController from "./LoginController";

const AddTaskToUser = ({ show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const header = LoginController();
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
    id: employeeId,
  });
  const [error, setError] = useState({});

  function validateInput(input) {
    let error = {};
    if (!input.name) {
      error.name = "Name is required";
    }
    if (!input.description) {
      error.description = "Description is required";
    }
    if (!input.priority) {
      error.priority = "Priority is required";
    }
    return error;
  }

  function handleChange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  function handleError(e) {
    setError(
      validateInput({
        ...task,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSubmit = (e) => {
    if (error.name || error.description || error.priority){
      e.preventDefault();
      swal("Error", "Please fill out all fields", "error");
    }
    else {
      e.preventDefault();
      dispatch(addTaskToUser(task, header));
      navigate("/");
    }
  };

  return (
    <div className={`fixed top-16 right-0 bottom-0 ${
            show ? 'left-[245px]' : 'left-[87px]'} font-['nunito'] ease-in-out transition-all duration-700 flex flex-col items-center justify-center w-[70%] m-auto`}>
      <h2 className="text-3xl font-extrabold flex w-full"><p className="text-[#0023c4]">A</p>dd new task to<p className="text-[#ff5cf4]">:</p></h2>
      <form onSubmit={(e) => handleSubmit(e)} className="w-full p-3.5 rounded-2xl mb-[10px]">
        <div className="flex">
           <label>Priority</label>
          <div>
            {error.priority && <small className="text-red-500 italic ml-2">{error.priority}</small>}
            <select
              name="priority"
              value={task.priority}
              className={`${Input()} w-auto mt-0`}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="regular">Regular</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="w-[-webkit-fill-available]">
             <label>Title of task:</label> 
            {error.name && <small className="text-red-500 italic ml-4">{error.name}</small>}
            <input
              type="text"
              name="name"
              placeholder="Title..."
              value={task.name}
              className={`${Input()} w-[-webkit-fill-available] mt-0`}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
         <label>Description</label> 
        <input
          type="text"
          name="description"
          placeholder="Description..."
          value={task.description}
          className={`${Input()} pb-10 w-[98%] my-0`}
          onChange={(e) => handleChange(e)}
        />
        {error.description && <small className="text-red-500 italic ml-3">{error.description}</small>}
        <button
          type="submit"
          onClick={(e) => handleError(e)}
          className={Primary()}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskToUser;
