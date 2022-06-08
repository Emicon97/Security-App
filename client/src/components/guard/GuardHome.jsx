import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTaskToUser } from "../../redux/actions";

const AddTaskToUser = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTaskToUser(id));
    navigate("/");
  };

  return (
    <>
      <h2>Add new Task to: </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Title of task:</label>
        <input type="text" placeholder="Title..." />
        <label>Description</label>
        <input type="text" placeholder="Briefe description of the task..." />
        <label>Priority</label>
        <select name="" id="">
          <option value="none">Select...</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Regular">Regular</option>
          <option value="Low">Low</option>
        </select>
      </form>
    </>
  );
};

export default AddTaskToUser;
