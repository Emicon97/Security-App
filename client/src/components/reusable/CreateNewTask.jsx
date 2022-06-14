import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTaskToUser } from "../../redux/actions";
import { Primary, Input } from "../styles/Buttons";
import LoginController from "./LoginController";
import '../styles/reusable/CreateNewTask.css';

const AddTaskToUser = ({ show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const header = LoginController();
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
    id: id,
  });
  const [error, setError] = useState({});

  function validateInput(input) {
    let error = {};
    if (!input.name) {
      error.name = "name is required";
    }
    if (!input.description) {
      error.description = "description is required";
    }
    if (!input.priority) {
      error.priority = "priority is required";
    }
    return error;
  }

  function handleChange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    setError(
      validateInput({
        ...task,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTaskToUser(task, header));
    navigate("/");
  };

  return (
    <div id="create-task" className={`fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700`}>

      <h2 className="title">Add new Task to: </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Title of task:</label>
        <input
          type="text"
          name="name"
          placeholder="Title..."
          value={task.name}
          className={Input()}
          onChange={(e) => handleChange(e)}
        />
        {error.name && <p className="">{error.name}</p>}
        <label>Description</label>
        <input
          type="text"
          name="description"
          placeholder="Briefe description of the task..."
          value={task.description}
          className={`${Input()} pb-10`}
          onChange={(e) => handleChange(e)}
        />
        {error.description && <p className="">{error.description}</p>}
        <label>Priority</label>
        <select
          name="priority"
          value={task.priority}
          className={Input()}
          onChange={(e) => handleChange(e)}
        >
          <option value="">Select...</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="regular">Regular</option>
          <option value="low">Low</option>
        </select>
        {error.priority && <p className="">{error.priority}</p>}
        <button type="submit" className={Primary()}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskToUser;
