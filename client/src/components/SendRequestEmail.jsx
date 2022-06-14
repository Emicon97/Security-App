import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../redux/actions";
import './styles/Login.css'


export default function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    dni: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [validate, setValidate] = useState(true);

  const validations = (input) => {
    let error = {};
    if(!/^[0-9]*$/.test(input.dni)) error.dni = "The ID must have 8 digits";
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)) {
      error.email = "The email can only contain letters, numbers, periods, hyphens and underscores.";
    }
    return error;
  };

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
    if (!errors.dni && !errors.email) {
      //reemplazar por otra actions
      dispatch(sendRequest(input));
      setInput({ dni: "", email: "" });
    } else {
      if (errors.dni || errors.email) {
        setValidate(false);
      } else {
        setValidate(true);
      }
    }
  }

  return  (
    <div className="login-screen">
      <form 
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="form-input-container">
          <input 
            type="number"
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
        <div className="input-password-container">
          <div className="form-password-container">
            <input 
              type="email"
              name="email"
              id="email" 
              className="form__input password__input" 
              autoComplete="off" 
              placeholder=" "
              value={input.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="email" className="form__label form__label__password">Email</label>
          </div>
        </div>
          
        <div className="errors-input">
          <h4 className="errors" style={{display: !validate && errors.dni ? "block" : "none"}}>
            {!validate ? errors.dni : null}
          </h4>
          <h4 className="errors" style={{display: !validate && errors.email ? "block" : "none"}}>
            {!validate ? errors.email : null}
          </h4>
        </div>
        <button type="submit">Send request</button>
      </form>

    </div>
  )
};
