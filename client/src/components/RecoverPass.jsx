import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword } from "../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const token = useSelector((state) => state.token);
  const [input, setInput] = useState({
    password: "",
    repeatPassword: "",
    id: ""
  });
  const [errors, setErrors] = useState({});
  const [validate, setValidate] = useState(true);

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

  const validations = (input) => {
    let error = {};
    if (
      !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
        input.password
      )
    )
      error.password =
        "The password must have at least 1 uppercase, 1 lowercase, 1 digit, 1 special character plus a length of at least 10.";
    if (input.repeatPassword !== input.password)
      error.repeatPassword = "Passwords do not match";
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
    if (!errors.password && !errors.repeatPassword) {
      //reemplazar por otra actions
      let user = location.pathname.split('/')
      let header = {headers:{ 
            'auth-token': user[4],
            'refresh-token': user[5],
            'id': user[3]
        }}
      let value = { ...input, id: user[3]}
      dispatch(recoverPassword(value, header));
      setInput({ password: "", repeatPassword: "", id: "" });
    } else {
      if (errors.password || errors.repeatPassword) {
        setValidate(false);
      } else {
        setValidate(true);
      }
    }
  }

  return (
    <div className="login-screen">
      <form className="form" onSubmit={handleSubmit}>
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
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <label htmlFor="password">{errors.password != "" && errors.password}</label>
        </div>
        <div className="input-password-container">
          <div className="form-password-container">
            <input
              type="text"
              name="repeatPassword"
              id="repeatPassword"
              className="form__input password__input"
              autoComplete="off"
              placeholder=" "
              value={input.repeatPassword}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label
              htmlFor="repearpassword"
              className="form__label form__label__password"
            >
              Repeat password
            </label>
            <label htmlFor="repeatPassword">{errors.repeatPassword != "" && errors.repeatPassword}</label>
          </div>
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
