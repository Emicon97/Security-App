import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPrueba } from "../redux/actions";
import { Input, Primary } from "./styles/Buttons";
import logo from "../assets/logo.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const token = useSelector((state) => state.token);
  const [input, setInput] = useState({ dni: "", password: "" });
  const [errors, setErrors] = useState({});

  const validations = (input) => {
    let error = {};
    if(!/^[0-9]*$/.test(input.dni)) error.dni = "Wrong DNI or wrong character";
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(input.password)) {
      error.password = "Must contain 8 characters, one lowercase, one uppercase and one number";
      //Hay que resumirlo muuucho mas jijiji;
    };
    return error;
  };

  const viewPassword = () => {
    var x = document.getElementById("password");
    x.type === "password" ? (x.type = "text") : (x.type = "password");
  };

  function handleChange(event) {
    setInput(input => {
      let newInput = {
        ...input,
        [event.target.name]: event.target.value,
      };
      const error = validations(newInput);
      setErrors(error);
      return newInput
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // if(!errors.dni && !errors.password) {
    dispatch(loginPrueba(input));
    setInput({ dni: "", password: "" });
    // } else {
    //   alert("Contraseña y/o DNI incorrectos")
    // }
  };

  useEffect(() => {
    if(userData[1] && token) {
      const id = userData[0]._id;
      switch (userData[1]) {
        case "watcher":
          return navigate(`/guard/${id}`);
        case "supervisor":
          return navigate(`/supervisor/${id}`);
        case "boss":
          return navigate(`/boss/${id}`);
      };
    };
  }, [token]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={logo} alt="Centinel logo" className="w-[400px] h-[400px] mr-12 mt-24" />
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center">
        <div className="flex flex-col relative mb-5">
          <input type="text" value={input.dni} placeholder="DNI" className={`${Input()} mb-0 placeholder:not-italic`} name="dni" onChange={(e) => handleChange(e)} autoComplete="off"/>
          {
            errors.dni ? 
            <small className="text-red-600 ml-3 absolute top-12">{errors.dni}</small> : 
            <small className="invisible ml-3 absolute top-12">Wrong DNI or wrong character</small>
          }
        </div>
        <div className="flex flex-col relative mb-5">
          <input type="password" value={input.password} placeholder="Password" className={`${Input()} mb-0 placeholder:not-italic`} name="password" id="password" onChange={(e) => handleChange(e)} autoComplete="off"/>
          {
            errors.password ? 
            <small className="text-red-600 ml-3 absolute top-12 w-420px">{errors.password}</small> : 
            <small className="invisible ml-3 absolute top-12 w-420px">Must contain 8 characters, one lowercase, one uppercase and one number</small>
          }
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-19px right-5 cursor-pointer" viewBox="0 0 20 20" fill="#0243EC" onClick={viewPassword}>
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <button type="submit" className={`${Primary('Login')} mt-2 py-2 pl-3 pr-3 m-2.5`}>Log in</button>
      </form>
    </div>
  );
};
