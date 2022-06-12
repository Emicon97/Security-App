import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { postUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import LoginController from "./LoginController";
import { Primary, Input, File } from "../styles/Buttons";
import demo from "../../assets/demo.png";
import swal from "sweetalert";

export default function AddNewUser({show}) {
  const dispatch = useDispatch();
  const header = LoginController();
  const navigate = useNavigate();
  const user = useLocation();
  const role = user.pathname.split('/')[1];
  const id = user.pathname.split('/')[2];

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
    dispatch(postUser(input, header, id));
    alert("User created successfully");
    setInput({});
    if(role === "supervisor"){
      navigate(`/supervisor/${id}`)
    } else {
      navigate(`/boss/${id}`);
    }
  }

  return (
    <div className={`mt-6 fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700 font-['nunito']`}>
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data" className="m-auto w-[70%]">
        <div className="flex-column justify-center mb-3">
          <div className="flex justify-between">
            <div>
              <label className="">Name: {error.name && <small className="text-red-500 italic">{error.name}</small>}</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                placeholder="Your Name..."
                className={handleClassName(error.name)}
                required
              />
            </div>
            <div>
              <label className="">LastName: {error.lastName && <small className="text-red-500 italic">{error.lastName}</small>}</label>
              <input
                type="text"
                value={input.lastName}
                name="lastName"
                onChange={(e) => handleChange(e)}
                placeholder="Your LastName..."
                className={handleClassName(error.lastName)}
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <label className="">DNI: {error.dni && <small className="text-red-500 italic">{error.dni}</small>}</label>
              <input
                type="number"
                name="dni"
                value={input.dni}
                onChange={(e) => handleChange(e)}
                placeholder="Your identification number"
                className={handleClassName(error.dni)}
                required
              />
            </div>
            <div>
              <label className="">E-mail: {error.email && <small className="text-red-500 italic">{error.email}</small>}</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) => handleChange(e)}
                placeholder="Your email..."
                className={handleClassName(error.email)}
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <label className="">Phone Number: {error.telephone && <small className="text-red-500 italic">{error.telephone}</small>}</label>
              <input
                type="tel"
                name="telephone"
                value={input.telephone}
                onChange={(e) => handleChange(e)}
                placeholder="Your phone number..."
                className={handleClassName(error.telephone)}
                required
              />
            </div>
            <div>
              <label className="">Password: {error.password && <small className="text-red-500 italic">{error.password}</small>}</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={(e) => handleChange(e)}
                placeholder="Your password..."
                className={handleClassName(error.password)}
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center justify-between w-[404px]">
              <div className="h-full">
                <label className="">Profile Picture:</label>
                <input
                  type="file"
                  name="profilePic"
                  onChange={(e) => uploadImage(e)}
                  className={File()}
                />
              </div>
              {
                !loading ? 
                <img src={demo} className="w-12 h-12 mr-3" alt="Could not load" /> :
                <img src={input.profilePic} className="w-12 h-12 mr-3" alt="Could not load" />
              }
            </div>
            <div className={`${show ? 'translate-x-6' : ''}}`}>
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
          </div>
          <div className="flex justify-between">
            <div>
              <label className="">Working Hours:</label>
              <input
                type="text"
                name="workingHours"
                value={input.workingHours}
                onChange={(e) => handleChange(e)}
                placeholder="Example: 8:00-17:00"
                className={handleClassName(error.name)}
              />
            </div>
            <div>
              <label className="">Address:</label>
              <input
                type="text"
                name="address"
                value={input.address}
                onChange={(e) => handleChange(e)}
                placeholder="Your address..."
                className={handleClassName(error.name)}
              />
            </div>
          </div>
        </div>
        <button type="submit" className={`${Primary()} m-auto`}>Add User</button>
      </form>
    </div>
  );
}
