import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployees, getAllEnvironments } from "../../redux/actions";
import { Primary } from "../styles/Buttons";
import LoginController from "../reusable/LoginController";

export default function EditEmployees({ user, hierarchy, allButton }) {
  const dispatch = useDispatch();
  const [formSend, setFormSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const header = LoginController();
  const environments = useSelector((state) => state.environments);

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
  };

  //Funcion para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar si hay algun cambio para actualizar
    if (values.environment === "" && values.workingHours === "") {
      return;
    }

    // Validar el formulario si tiene errores o no
    if (errors.environment !== "" || errors.workingHours !== "") {
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
    allButton(e);
    setValues({
      environment: "",
      workingHours: "",
    });
  };

  useEffect(() => {
    dispatch(getAllEnvironments(header));
  }, []);

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

                <select
                  id="select"
                  onChange={handleChange}
                  className={Input()}
                  name="environment"
                >
                  <option key="select">Environment...</option>
                  {environments.length &&
                    environments.map((env) => (
                      <option key={env._id} value={env.name}>
                        {env.name}
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