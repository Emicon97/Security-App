import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest, verificationUser } from "../redux/actions";
import './styles/SendRequestEmail.css'


export default function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    dni: 0,
    email: "",
  });
  const [errors, setErrors] = useState({
    dni: "",
    email: "",
  });
  const [status, setStatus] = useState("");
  const [validate, setValidate] = useState("");
  const verification = useSelector(state => state.temp);

  useEffect(() => {
    setStatus(verification)
  }, [verification])

  const handleBlur = (e) => {
    if (e.target.name === "dni") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      } else if (isNaN(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: "The dni must be a number"
        })
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
    }
    if (e.target.name === "email") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value)
      ) {
        setErrors({
          ...errors,
          [e.target.name]: "The email can only contain letters, numbers, periods, hyphens and underscores."
        })
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      }
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (errors.dni === "" && errors.email === "") {
      dispatch(verificationUser(input))
      if (verification === "Correct compatibility") {
        setStatus("")
        dispatch(sendRequest(input));
        alert("The request was sent correctly check your email")
        setInput({ dni: "", email: "" });
      } else {
        setStatus(verification)
      }
    }
  }

  return (
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
            className="form-login__input"
            autoComplete="off"
            placeholder=" "
            onBlur={handleBlur}
            value={input.dni}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label htmlFor="dni" className="form-login__label">DNI</label>
        </div>
          <div className="form-input-container">
            <input
              type="email"
              name="email"
              id="email"
              className="form-login__input password"
              autoComplete="off"
              placeholder=" "
              onBlur={handleBlur}
              value={input.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="email" className="form__label form-login__label__password">Email</label>
          </div>
        <div className="errors-input">
          {status !== "" && <small>{status}</small>}
          {errors.email && (
            <h4 className="text-red-600">{errors.email}</h4>
          )}
          {errors.dni && (
            <small className="text-red-600">{errors.dni}</small>
          )}
        </div>
        <button type="submit">Send request</button>
      </form>

    </div>
  )
};
