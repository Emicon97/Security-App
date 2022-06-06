import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { headerTest, loginPrueba } from "../redux/actions";

import { Input, Primary } from "./styles/Buttons";

export default function LoginFake() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const [input, setInput] = useState({
    dni: "",
    password: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginPrueba(input));
    setInput({ dni: "", password: "" });
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

  // const redirector = (e) => {
  //   e.preventDefault();
  //   dispatch(loginPrueba({ dni: input.dni, password: input.password }));
  // };

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
                type="number"
                value={input.dni}
                placeholder="Example: 1234567..."
                className={Input()}
                name="dni"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
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
              />
            </label>
            <button className={`${Primary()} mt-6 font-extrabold text-lg`}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
