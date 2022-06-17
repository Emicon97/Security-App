import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPrueba } from "../redux/actions";
import logo from "../assets/logo.png";
import eyeOpen from "../assets/eye_visible.png";
import eyeClose from "../assets/eye_slash_visible.png";
import "./styles/Login.css";

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
    if (!/^[0-9]*$/.test(input.dni))
      error.dni = "Wrong DNI, only numbers are allowed";
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        input.password
      )
    ) {
      error.password =
        "Must contain at least one number and one uppercase and lowercase letter, and 8 or more characters";
    }
    return error;
  };

  const viewPassword = (event) => {
    let x = document.getElementById("password");
    let btn = document.getElementsByClassName("eye");
    if (x.type === "password") {
      x.type = "text";
      btn[0].style.display = "none";
      btn[1].style.display = "block";
    } else {
      x.type = "password";
      btn[0].style.display = "block";
      btn[1].style.display = "none";
    }
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
    if (!errors.dni && !errors.password) {
      dispatch(loginPrueba(input));
      setInput({ dni: "", password: "" });
    } else {
      if (errors.dni || errors.password) {
        setValidate(false);
      } else {
        setValidate(true);
      }
    }
  }

  function requestEmail() {
    navigate("/email");
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
        default:
          return navigate('/');
      }
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="login-screen">
      <div className="wrapp">
        <div className="text">
          <h1>
            <span className="blue">C</span>entine<span className="pink">l</span>
          </h1>
        </div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
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
          <label htmlFor="dni" className="form__label">
            DNI
          </label>
        </div>
        <div className="input-password-container">
          <div className="form-password-container">
            <input
              type="password"
              name="password"
              id="password"
              className="form__input password__input"
              autoComplete="off"
              placeholder=" "
              value={input.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label
              htmlFor="password"
              className="form__label form__label__password"
            >
              Password
            </label>
          </div>
          <div className="eye-icon">
            <img className="eye" src={eyeOpen} alt="" onClick={viewPassword} />
            <img className="eye" src={eyeClose} alt="" onClick={viewPassword} />
          </div>
        </div>

        <div className="errors-input">
          <h4
            className="errors"
            style={{ display: !validate && errors.dni ? "block" : "none" }}
          >
            {!validate ? errors.dni : null}
          </h4>
          <h4
            className="errors"
            style={{ display: !validate && errors.password ? "block" : "none" }}
          >
            {!validate ? errors.password : null}
          </h4>
        </div>
        <button type="submit">Login</button>
        {/* Btn para recuperar contraseña */}
        <button onClick={requestEmail}>Did you forget your password?</button>
      </form>
      {/* <h2>LOG IN WITH THE FOLLOWING DATA:</h2>
      <p>DNI:</p>
      <p>37062742</p>
      <p>PASSWORD:</p>
      <p>MyPassword123</p> */}
    </div>
  );
}
