import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEmployees } from "../../redux/actions";
import { Primary } from "../styles/Buttons";
import LoginController from "../reusable/LoginController";

export default function EditEmployees({ user, hierarchy, handleAllButton }) {
  const dispatch = useDispatch();
  const typeEnv = ["uno", "dos", "tres", "cuatro", "cinco"];
  const [formSend, setFormSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const header = LoginController();

  //Estados locales donde manejaremos cada uno de los datos para actualizar un usuario
  const [values, setValues] = useState({
    environment: "",
    workingHours: "",
  });

  //Estados donde manejaremos los errores
  const [errors, setErrors] = useState({
    environment: "",
    workingHours: "",
  });

  //Funcion que se ejecuta al cambiar el valor de cada input
  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

//   useEffect(() => {
//     dispatch(getEmployeeById(user._id));
//   }, [dispatch]);

  //Funcion que se ejecuta cuando el usuario coloca el foco en un input
  const handleBlur = (e) => {
    //Validacion de environment
    if (e.target.name === "environment") {
      if (e.target.value === "0") {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }
}

  //Funcion para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar si hay algun cambio para actualizar
    if (
      values.environment === "" &&
      values.workingHours === "" 
    ) {
      return;
    }

    // Validar el formulario si tiene errores o no
    if (
      errors.environment !== "" ||
      errors.workingHours !== ""
    ) {
      alert("Please correct the errors in the form to continue");
      return;
    }
    //Creo una variable que va a tener el valor de los datos a cambiar
    let value = {};
    //Realizo un ciclo sobre mi state values donde le pasare a la variable
    //value solo los valores distintos a ""
    for (let i in values) {
      if (values[i] !== "") {
        value = {
          ...value,
          [i]: values[i],
        };
      }
    }
    //Mando los datos por el actions para realizar los cambios
    dispatch(updateEmployees(user._id, value, header));
    //Mensaje de alerta de que todo resulto con exito
    alert("updates were successful");
    handleAllButton(e)
    setValues({
      environment: "",
      workingHours: "",
    });
  };

 

  return (
    <form
      className="flex flex-col items-center"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      {hierarchy === "boss" || hierarchy === "supervisor" ? (
        <div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-between">
              <div>
                <label htmlFor="environment">
                  Environment:{" "}
                  {errors.environment && (
                    <small className="text-red-600">{errors.environment}</small>
                  )}
                </label>

                <select id="select" onChange={handleChange} className={Input()} name="environment">
                    <option key="select"  >Environment...</option>
                     {typeEnv?.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <label htmlFor="workingHours">
                Working Hours:{" "}
                {errors.workingHours && (
                  <small className="text-red-600">{errors.workingHours}</small>
                )}
              </label>
              <input
                className={Input()}
                type="text"
                id="workingHours"
                name="workingHours"
                value={values.workingHours}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Hs Working"
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex gap-4">
        <button type="submit" className={Primary()}>
          Edit
        </button>
      </div>
      {formSend && (
        <small className="text-green-600">Employee edited successfully</small>
      )}
    </form>
  );
}

const Input = (props) => `
    hover:bg-slate-100
    placeholder:italic placeholder:text-slate-400 
    block bg-white w-${props === "Select" ? "48" : "96"} m-2.5
    border border-slate-300 rounded-md 
    py-2 pl-3 pr-3 shadow-sm 
    focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 
    sm:text-sm
`;

// const File = (props) => `
//     block w-full text-sm text-slate-500
//     file:mr-4 file:py-2 file:px-4
//     file:rounded-full file:border-0
//     file:text-sm file:font-semibold
//     file:bg-blue-50 file:text-blue-700
//     hover:file:bg-blue-100
// `;

// const Button = (props) => `
//     font-bold text-white
//     bg-blue-500
//     w-32 h-10 p-0 m-0
//     border-2 border-blue-500
//     hover:border-blue-600 hover:bg-blue-600
//     active:border-blue-700 active:bg-blue-700
//     rounded-3xl
// `;

// const ButtonDelete = (props) => `
//     flex flex-row justify-evenly items-center
//     h-10 w-28
//     text-white font-semibold
//     rounded-md
//     bg-red-600
//     hover:bg-red-700
//     active:bg-red-800 active:ring-4 active:ring-red-200
// `;
