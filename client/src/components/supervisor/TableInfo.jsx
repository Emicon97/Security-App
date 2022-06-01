import React, { useDeferredValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployees, searchEmployees } from "../../redux/actions";
import "./TableInfo.css";
import { Primary as button } from "../styles/Buttons";

export default function TableInfo() {
  const dispatch = useDispatch();
  const watchers = useSelector((state) => state.employees);
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getEmployees(id, e.target.value));
  };

  const handleAllButton = (e) => {
    e.preventDefault();
    dispatch(searchEmployees(id, ""));
  };

  const handleCheckbox = (e) => {
      if(e.target.checked) {
        document.querySelectorAll(".checkbox").forEach(checkbox => checkbox.checked = true);
      }
        else {
            document.querySelectorAll(".checkbox").forEach(checkbox => checkbox.checked = false);
            }
  }

  useEffect(() => {
    dispatch(getEmployees(id, ""));
  }, [dispatch]);
  return (
    <div className="datatable-container">
      <div className="header-tools">
        <div className="tools">
          <ul>
            <li>
              <span className="ml-4">
                <input type="checkbox" onClick={handleCheckbox} />
              </span>
            </li>
            <li>
              <button>
                <i className="material-icons">add_circle</i>
              </button>
            </li>
            <li>
              <button>
                <i className="material-icons">edit</i>
              </button>
            </li>
            <li>
              <button>
                <i className="material-icons">delete</i>
              </button>
            </li>
          </ul>
        </div>
        <div className="search flex mr-4">
          <input
            type="text"
            placeholder="Search name"
            className="search-input mr-4"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          ></input>
          <button className={button()} onClick={e => handleAllButton(e)}>All</button>
        </div>
      </div>
      <>
        <table className="datatable">
          <thead>
            <tr>
              <th>Check</th>
              <th>Name</th>
              <th>Environment</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {watchers &&
              watchers.map((employee) => (
                <tr key={employee._id}>
                  <td className="table-checkbox">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>
                    {employee.name} {employee.lastName}
                  </td>
                  <td>{employee.environment} (lugar de trabajo)</td>
                  <td>
                    <button>
                      <i className="material-icons">edit</i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="footer-tools">
          <div className="list-items">
            Show
            <select name="n-entries" id="n-entries" className="n-entries">
              <option value="20">20</option>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
            entries
          </div>
          <div className="pages">
            <ul>
              <li>
                <span className="active">1</span>
              </li>
              <li>
                <button>2</button>
              </li>
              <li>
                <button>3</button>
              </li>
              <li>
                <button>4</button>
              </li>
              <li>
                <span>...</span>
              </li>
              <li>
                <button>11</button>
              </li>
              <li>
                <button>12</button>
              </li>
            </ul>
          </div>
        </div>
      </>
    </div>
  );
}
