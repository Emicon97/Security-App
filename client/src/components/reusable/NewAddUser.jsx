import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import LoginController from "./LoginController";
import { Primary, Input, File } from "../styles/Buttons";
import demo from "../../assets/demo.png";
import swal from "sweetalert";

export default function AddNewUser() {
  const dispatch = useDispatch();
  const header = LoginController();
  const user = useSelector((state) => state.userDetails);
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    dni: 0,
    password: "",
    email: "",
    telephone: 0,
    profilePic: "",
    workingHours: "",
    address: "",
    environment: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const typeEnv = [
    "neighbourhood one",
    "neighbourhood two",
    "neighbourhood three",
    "neighbourhood four",
    "neighbourhood five",
  ];

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "magqqp6o");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload",
      { method: "POST", body: data }
    );

    const file = await res.json();
    setImage(await file.secure_url);
    setLoading(false);
    setInput({
      ...input,
      profilePic: file.secure_url,
    });
  };
  
  function validateInput(input) {
    let error = {};
    const regex = /^[a-zA-Z ]+$/;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    //Working Hours
    if (input.workingHours < 0 || input.workingHours > 24)
      error.workingHours = "Working hours must be between 0 and 24";

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
      input.password.lentgh > 24 ||
      !input.password
    )
      error.password = "Password must be between 8 and 24 characters";
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

    //Address
    if (!input.address) error.address = "This field is mandatory";

    //Environment
    if (!input.environment) error.environment = "This field is mandatory";

    return error;
  }

  const viewPassword = () => {
    var x = document.getElementById("password");
    x.type === "password" ? (x.type = "text") : (x.type = "password");
  };

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
    if (!error) return Input();
    else return Input();
  }
  //Function for submit button recipe//
  function handleSubmit(e) {
    e.preventDefault();
    if (
      error.name ||
      error.lastName ||
      error.dni ||
      error.password ||
      error.email ||
      error.telephone ||
      error.environment
    )
    if (
      !input.name &&
      !input.lastName &&
      !input.dni &&
      !input.email &&
      !input.password &&
      !input.telephone &&
      !input.environment
    )
      return swal(
        "Wait!",
        "You have to fill the mandatory fields first",
        "error"
      );
    dispatch(postUser(input, header, user[0]._id));
    alert("User created successfully");
    setInput({});
    navigate(`/boss/${user[0]._id}`);
  }

  return (
    <div>
      <div className="">
        <Link to={`/boss/${user[0]._id}`}>
          {" "}
          <button className={Primary()}>Dashboard</button>{" "}
        </Link>
        <h2>Add new Employee:</h2>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <div className="flex-column justify-center">
          <label className="">Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder="Your Name..."
            className={handleClassName(error.name)}
            required
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
            required
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
            required
          />
          {error.dni && <p className="">{error.dni}</p>}
          <label className="">E-mail:</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => handleChange(e)}
            placeholder="Your email..."
            className={handleClassName(error.email)}
            required
          />
          {error.email && <p className="">{error.email}</p>}

          <label className="">Phone Number: </label>
          <input
            type="tel"
            name="telephone"
            value={input.telephone}
            onChange={(e) => handleChange(e)}
            placeholder="Your phone number..."
            className={handleClassName(error.telephone)}
            required
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
            required
          />
          {error.password && <p className="">{error.password}</p>}
          <label className="">Profile Picture:</label>
          <input
            type="file"
            name="profilePic"
            onChange={(e) => uploadImage(e)}
            className={File()}
          />
          <img className="w-12 h-12" src={demo} alt="Could not load" />
          {loading ? (
            ((input.profilePic = image),
            (<img className="w-12 h-12" src={demo} alt="Could not load" />))
          ) : (
            <img src={image} className="w-12 h-12" alt="Could not load" />
          )}
          <label className="">Working Hours:</label>
          <input
            type="text"
            name="workingHours"
            value={input.workingHours}
            onChange={(e) => handleChange(e)}
            placeholder="Example: 8:00-17:00"
            className={handleClassName(error.name)}
          />
          <label className="">Address:</label>
          <input
            type="text"
            name="address"
            value={input.address}
            onChange={(e) => handleChange(e)}
            placeholder="Your address..."
            className={handleClassName(error.name)}
          />
          {/* Chequear el environment */}
          <label className="">Environment:</label>
          <select
            name="environment"
            className={handleClassName(error.name)}
            onChange={(e) => handleChange(e)}
          >
            <option value="none">Select...</option>
            {typeEnv.map((env) => {
              return (
                <option value={(input.environment = env)} key={env}>
                  {env}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button type="submit" className={Primary()}>
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}
