import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPrueba } from "../redux/actions";
import { Input, Primary } from "./styles/Buttons";
import logo from "../assets/logo.png";
import './styles/Login.css'

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const token = useSelector((state) => state.token);
  const [input, setInput] = useState({
    dni: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [validate, setValidate] = useState(true);

  const validations = (input) => {
    let error = {};
    if(!/^[0-9]*$/.test(input.dni)) error.dni = "DNI incorrecto o carácter incorrecto";
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(input.password)) {
      error.password = "Debe contener 8 caracteres, una minúscula, una mayúscula y un número";
      //Hay que resumirlo muuucho mas jijiji;
    }
    return error;
  };

  // const viewPassword = () => {
  //   var x = document.getElementById("password");
  //   x.type === "password" ? (x.type = "text") : (x.type = "password");
  // };

  function handleChange(event) {
    setInput((input) => {
      let newInput = {
        ...input,
        [event.target.name]: event.target.value,
      };
      const error = validations(newInput);
      setErrors(error);
      return newInput;
    });
    setValidate(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!errors.dni && !errors.password) {
      dispatch(loginPrueba(input));
      setInput({ dni: "", password: "" });
    } else {
      if (errors.dni || errors.password) {
        console.log("false");
        setValidate(false);
      } else {
        console.log("true");
        setValidate(true);
      }
    }
  }

  useEffect(() => {
    if (userData[1] && token) {
      const id = userData[0]._id;
      switch (userData[1]) {
        case "watcher":
          return navigate(`/guard/${id}`);
        case "supervisor":
          return navigate(`/supervisor/${id}`);
        case "boss":
          return navigate(`/boss/${id}`);
      }
    }
  }, [token]);

 







  return (
    <div className="login-screen">

      <form 
        className="form"
        onSubmit={handleSubmit}
      >
        
        <div className="form-input-container">
          <input 
            type="text"
            name="dni"
            id="dni" 
            className="form__input" 
            autoComplete="off" 
            placeholder=" "
            value={input.dni}
            onChange={(e) => {
              handleChange(e);
            }} 
          />
          <label htmlFor="dni" className="form__label">DNI</label>
        </div>
        
        <div className="form-input-container">
          <input 
            type="text"
            name="password"
            id="password" 
            className="form__input" 
            autoComplete="off" 
            placeholder=" "
            value={input.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label htmlFor="password" className="form__label">Password</label>
        </div>
          
        <div className="errors-input">
          <h4 className="errors" style={{display: !validate && errors.dni ? "block" : "none"}}>
            {!validate ? errors.dni : null}
          </h4>
          <h4 className="errors" style={{display: !validate && errors.password ? "block" : "none"}}>
            {!validate ? errors.password : null}
          </h4>
        </div>
        <button type="submit">Login</button>

      </form>

    </div>
  );
};
