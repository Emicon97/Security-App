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
  const [input, setInput] = useState({
    dni: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [validate, setValidate] = useState(true);

  const validations = (input) => {
    let error = {};
    if (!/^[0-9]*$/.test(input.dni)) error.dni = "Wrong DNI or wrong character";
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        input.password
      )
    ) {
      error.password =
        "Must contain 8 characters, one lowercase, one uppercase and one number";
      //Hay que resumirlo muuucho mas jijiji;
    }
    return error;
  };

  const viewPassword = () => {
    var x = document.getElementById("password");
    x.type === "password" ? (x.type = "text") : (x.type = "password");
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
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={logo}
        alt="Centinel logo"
        className="w-[400px] h-[400px] mr-12 mt-24"
      />
      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col items-center"
        >
          <label className="text-xl font-bold">DNI:</label>
          <div className="flex flex-col relative mb-5">
            <input
              type="text"
              value={input.dni}
              placeholder="DNI"
              className={`${Input()} mb-0 placeholder:not-italic`}
              name="dni"
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
            {errors.dni ? (
              <small className="text-red-600 ml-3 absolute top-12">
                {errors.dni}
              </small>
            ) : (
              <small className="invisible ml-3 absolute top-12">
                Wrong DNI or wrong character
              </small>
            )}
          </div>
          <label className="text-xl font-bold">Password: </label>
          <div className="flex flex-col relative mb-5">
          <input
            type="password"
            value={input.password}
            className={Input()}
            placeholder="Your password..."
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
            autoComplete="off"
          />
          <small className="text-red-600 ml-3 absolute top-12">{!validate ? errors.password : null}</small>
          </div>
          <button
            type="submit"
            className={`${Primary("Login")} mt-2 py-2 pl-3 pr-3 m-2.5`}
          >
            Log in
          </button>
        </form>
      </div>
        </div>
  );
}
