import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { postUser, getEmployees } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import LoginController from "./LoginController";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const { id } = useParams();
  const header = LoginController();

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    dni: 0,
    password: "",
    email: "",
    telephone: 0,
    profilePic: "",
  });

  const [error, setError] = useState({});

  function validateInput(input) {
    let error = {};
    const regex = /^[a-zA-Z ]+$/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //Name and LastName
    if (!input.name || !regex.test(input.name))
      error.name = "Enter a valid name, no special characters allowed";
    if (!input.lastName || !regex.test(input.lastName))
      error.lastName = "Enter a valid lastName, no special characters allowed";

    //DNI
    if (!input.dni)
      error.dni = "This field is mandatory, it has to be a number";
    if (isNaN(input.dni)) error.dni = "The dni must be a number";

    //Password
    if (
      input.password.lentgh < 8 ||
      input.password.lentgh > 16 ||
      !input.password
    )
      error.password = "Password must be between 8 and 16 characters";
    if (!input.password.match(/[a-z]/g))
      error.password =
        "The password must contain at least one lowercase letter";
    if (!input.password.match(/[A-Z]/g))
      error.password =
        "The password must contain at least one uppercase letter";
    if (!input.password.match(/\d/g))
      error.password = "The password must contain at least one number";

    //Telephone
    if (isNaN(input.telephone))
      error.telephone = "The phone number must be a number";

    //Email
    if (!input.email || !regexEmail.test(input.email))
      error.email = "Enter a valid email";

    return error;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validateInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleClassName(error) {
    if (!error) return "chau";
    else return "hola";
  }
  //Function for submit button recipe//
  function handleSubmit(e) {
    e.preventDefault();
    const userExists = employees.find(
      (employee) =>
        `${employee.name.toLowerCase()} ${input.lastName.toLowerCase()}` ===
        `${input.name.toLowerCase()} ${employee.lastName.toLowerCase()}`
    );
    if (
      error.name ||
      error.lastName ||
      error.dni ||
      error.password ||
      error.email ||
      error.telephone
    )
      return alert("You have to fill the mandatory fields first");
    if (
      !input.name &&
      !input.lastName &&
      !input.dni &&
      !input.email &&
      !input.password &&
      !input.telephone
    )
      return alert("You have to fill the mandatory fields first");
    if (userExists) return alert("it seems this user already exists");
    dispatch(postUser(input));
    setInput({});
    //history.push("/recipes");
  }

  useEffect(() => {
    dispatch(getEmployees(id, header));
  }, [dispatch]);
  return (
    <div className="">
      {/* <div className="">
        <Link to={"/recipes"}>
          {" "}
          <button className="">Home</button>{" "}
        </Link>
        <h2>Create Your Recipe:</h2>
      </div> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="">
          <label className="">Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder="Your Name..."
            className={handleClassName(error.name)}
          />
          {error.name && <p className="">{error.name}</p>}
          <label className="">LastName:</label>
          <input
            type="text"
            value={input.lastName}
            name="lastName"
            onChange={(e) => handleChange(e)}
            placeholder="Your LastName..."
            className={handleClassName(error.lastName)}
          />
          {error.lastName && <p className="">{error.lastName}</p>}
          <label className="">DNI:</label>
          <input
            type="number"
            name="dni"
            value={input.dni}
            onChange={(e) => handleChange(e)}
            placeholder="Your identification number"
            className={handleClassName(error.dni)}
          />
          {error.dni && <p className="">{error.dni}</p>}
          <label className="">E-mail:</label>
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={(e) => handleChange(e)}
            placeholder="Your email..."
            className={handleClassName(error.email)}
          />
          {error.email && <p className="">{error.email}</p>}

          <label className="">Phone Number: </label>
          <input
            type="number"
            name="telephone"
            value={input.telephone}
            onChange={(e) => handleChange(e)}
            placeholder="Your phone number..."
            className={handleClassName(error.telephone)}
          />
          {error.telephone && <p className="">{error.telephone}</p>}
          <label className="">Password:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) => handleChange(e)}
            placeholder="Your password..."
            className={handleClassName(error.password)}
          />
          {error.password && (
            <p className="">{error.password}</p>
          )}
        </div>
        <div>
          <button type="submit" className="">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}
