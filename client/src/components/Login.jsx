import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { headerTest, loginPrueba } from "../redux/actions";
import { Input, Primary } from "./styles/Buttons";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const [input, setInput] = useState({
    dni: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validations = (input) => {
    let error = {};
    if(!/^[0-9]*$/.test(input.dni)) {
      error.dni = "DNI mal";
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(input.password)) {
      error.password = "Debe ser contener 8 caracteres, entre ellos una letra minúscula, una mayúscula y un numero";
      //Hay que resumirlo muuucho mas jijiji;
    }
    return error;
  }

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
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if(!errors.dni && !errors.password) {
      dispatch(loginPrueba(input));
      setInput({ dni: "", password: "" });
    // } else {
    //   alert("Contraseña y/o DNI incorrectos")
    // }
  }

  useEffect(() => {
    if (userData[1]) {
      const id = userData[0]._id;
      switch (userData[1]) {
        case "watcher":
          return navigate(`/watcher/${id}`);
        case "supervisor":
          return navigate(`/supervisor/${id}`);
        case "boss":
          return navigate(`/boss/${id}`);
      }
    }
  }, [userData]);

  return (
    <div className="flex justify-center items-center">
      <div className="border-solid border-2 rounded-xl p-4 shadow-lg max-w-prose flex-column">
        <div className="flex justify-center mb-10">
          {" "}
          <h2 className="text-3xl font-extrabold">Log In</h2>{" "}
        </div>
        <div className="flex justify-center">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label className="text-xl font-bold">
              DNI:
              <input
                type="text"
                value={input.dni}
                placeholder="Example: 1234567..."
                className={Input()}
                name="dni"
                onChange={(e) => {
                  handleChange(e);
                }}
                autoComplete="off"
              />
              <h4>{errors.dni}</h4>
            </label>
            <label className="text-xl font-bold">
              Password:{" "}
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
              <h4>{errors.password}</h4>
            </label>
            <button type="submit" className={`${Primary()} mt-6 font-extrabold text-lg`}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
