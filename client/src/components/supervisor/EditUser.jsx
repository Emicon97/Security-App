import React, { useState , useEffect } from "react";
import { useDispatch} from "react-redux";
import { updateUser } from "../../redux/actions";
import { Primary } from "../styles/Buttons";
import LoginController from "../reusable/LoginController";
import { getEmployeeById } from "../../redux/actions";

export default function EditUser({ user, hierarchy}) {
  const dispatch = useDispatch();
  const typeEnv = ["uno", "dos", "tres", "cuatro", "cinco"];
  const [formSend, setFormSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const header = LoginController();

  //Estados locales donde manejaremos cada uno de los datos para actualizar un usuario
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    password: "",
    dni: "",
    profilePic: "",
    email: "",
    address: "",
    environment: "",
    telephone: "",
    workingHours: "",
  });

  //Estados donde manejaremos los errores
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    password: "",
    dni: "",
    profilePic: "",
    email: "",
    address: "",
    environment: "",
    telephone: "",
    workingHours: "",
  });
  
  //Funcion para subir una imagen a cloudinary y retornar una url
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "a4bkl9ib");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/securityapp/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    setValues({ ...values, profilePic: file.secure_url });
    setLoading(false);
  };

  //Funcion que se ejecuta al cambiar el valor de cada input
  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getEmployeeById(user._id));
  }, [dispatch]);

  //Funcion que se ejecuta cuando el usuario coloca el foco en un input
  const handleBlur = (e) => {
    //Validacion de nombre
    if (e.target.name === "name") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: "Only letters and spaces are accepted *",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
    }

    //Validacion de lastName
    if (e.target.name === "lastName") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      } else if (!/^[a-zA-Z ]*$/.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: "Only letters and spaces are accepted *",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
    }

    //Validacion de password
    if (e.target.name === "password") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      } else if (
        !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
          e.target.value
        )
      ) {
        setErrors({
          ...errors,
          [e.target.name]:
            "The password must have at least 1 uppercase, 1 lowercase, 1 digit, 1 special character plus a length of at least 10.",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
    }

    //Validacion de environment
    if (e.target.name === "environment") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      } 
    }

    //Validacion de profilePic
    if (e.target.name === "profilePic") {
      if(e.target.value === ""){
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: "You have to enter a valid url",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
    }

    //Validación de email
    if(e.target.name === "email"){
      if(e.target.value === ""){
        setErrors({
          ...errors,
          [e.target.name] : ""
        })
      } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value)
      ) {
        setErrors({
          ...errors,
         [e.target.name] :"The email can only contain letters, numbers, periods, hyphens and underscores."
        })
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
    }
    //Validación de dni
    if (e.target.name === "dni") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      } else if (!/^[0-9]{8}$/.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: "The ID must have 8 digits",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
    }

    //Validación de telephone
    if (e.target.name === "telephone") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      } else if (isNaN(Number(e.target.value))){
        setErrors({
          ...errors,
          [e.target.name]: "You can only enter numbers *",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
  }
  };

  //Funcion para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar si hay algun cambio para actualizar
    if(
      values.name === "" &&
      values.lastName === "" &&
      values.password === "" &&
      values.dni === "" &&
      values.profilePic === "" &&
      values.email === "" &&
      values.environment === "" &&
      values.telephone === "" &&
      values.workingHours === "" &&
      values.address === ""
    ){
      return;
    }

    // Validar el formulario si tiene errores o no
    if(
      errors.name !== "" ||
      errors.lastName !== "" ||
      errors.password !== "" ||
      errors.dni !== "" ||
      errors.profilePic !== "" ||
      errors.email !== "" ||
      errors.environment !== "" ||
      errors.telephone !== "" ||
      errors.workingHours !== ""
    ){
      alert("Please correct the errors in the form to continue");
      return;
    }
    //Creo una variable que va a tener el valor de los datos a cambiar
    let value = {}
    //Realizo un ciclo sobre mi state values donde le pasare a la variable
    //value solo los valores distintos a ""
    for(let i in values){
      if(values[i] !== ""){
        value={
          ...value,
          [i]: values[i]
        }
      }
    }
    //Mando los datos por el actions para realizar los cambios
    dispatch(updateUser(user._id,value, header));
    //Mensaje de alerta de que todo resulto con exito
    alert("updates were successful")

    setValues({
      name: "",
      lastName: "",
      password: "",
      dni: "",
      profilePic: "",
      email: "",
      address: "",
      environment: "",
      telephone: "",
      workingHours: "",
    })
  }

  const viewPassword = () => {
    var x = document.getElementById("password");
    x.type === "password" ? (x.type = "text") : (x.type = "password");
  };

  return (
    <form
      className="flex flex-col items-center"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      {hierarchy === "boss" || hierarchy === "supervisor" || hierarchy === "watcher" ? (
        <div>
          {/*Direccion y Email */}
          <div className="flex flex-row items-center justify-between">
            <div>
              <label htmlFor="address">
                Address:{" "}
                {errors.address && (
                  <small className="text-red-600">{errors.address}</small>
                )}
              </label>
              <input
                className={Input()}
                type="text"
                id="address"
                name="address"
                value={values.address}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={user.address}
              />
            </div>
            <div>
       <label htmlFor="email">
         Email:{" "}
        {errors.email && <small className="text-red-600">{errors.email}</small>}
       </label>
       <input
         className={Input()}
         type="text"
         id="email"
         name="email"
         value={values.email}
         onBlur={handleBlur}
         onChange={handleChange}
         placeholder={user.email}
       />
     </div>
          </div>       
          <div className="flex flex-row items-center justify-between">
          <div>
                  <label htmlFor="password">
                    Password:{" "}
                    {errors.password && <small className="text-red-600">{errors.password}</small>}
                  </label>
                  <input
                    className={Input()}
                    type="text"
                    id="password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
        <div>
          <label htmlFor="telephone">
            Telephone:{" "}
            {errors.telephone && (
              <small className="text-red-600">{errors.telephone}</small>
            )}
          </label>
          <input
            className={Input()}
            type="number"
            id="telephone"
            name="telephone"
            value={values.telephone}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={user.telephone}
          />
        </div>
       
          </div>
          <div className="m-3 w-96">
          <div className="flex flex-row">
            <input
              className={File()}
              type="file"
              name="file"
              onChange={(e) => uploadImage(e)}
            />
            {loading ? (
              (values.profilePic,
              (
                <img
                  className="w-10 h-10"
                  src={values.profilePic}
                  style={{ widht: "100px" }}
                />
              ))
            ) : (
              <img
                src={user.profilePic ? user.profilePic : null}
                className="w-10 h-10"
              />
            )}
          </div>
          {errors.profilePic && (
            <small className="text-red-600">{errors.profilePic}</small>
          )}
        </div>
        </div>
      ): null}

      <div className="flex flex-row items-center justify-between">
      </div>
      
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

const File = (props) => `
    block w-full text-sm text-slate-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100
`;

const Button = (props) => `
    font-bold text-white
    bg-blue-500
    w-32 h-10 p-0 m-0
    border-2 border-blue-500
    hover:border-blue-600 hover:bg-blue-600
    active:border-blue-700 active:bg-blue-700
    rounded-3xl
`;

const ButtonDelete = (props) => `
    flex flex-row justify-evenly items-center
    h-10 w-28
    text-white font-semibold
    rounded-md
    bg-red-600
    hover:bg-red-700
    active:bg-red-800 active:ring-4 active:ring-red-200
`;
