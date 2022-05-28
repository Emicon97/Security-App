import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";



const checkUndefined = (input) => {
    if(input.rol.length === 0) return true;
    for(let key in input) return input[key] === '';
};

const validate = (input) => {
    const {name, lastName, address, dni, phoneNumber, email, image} = input;
    const regexAddress = /^[A-Za-z0-9\s]+$/; //nombre con letras, numeros y espacios 
    const regexName = /^[a-zA-Z ]*$/;//solo letras y espacios
    const regexImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/; 
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const errors = {}
    
    if(checkUndefined(input)) errors.allFields= 'Todos los campos son requeridos';
    if(!regexAddress.test(address)) errors.address = "Solo se aceptan números, letras y espacios";
    if(!regexName.test(name)) errors.name = "Solo se aceptan letras y espacios";
    if(!regexName.test(lastName)) errors.lastName = "Solo se aceptan letras y espacios";
    if(isNaN(Number(dni)) || dni.length<8 || dni.length>8) errors.dniFormat = "El formato debe ser de 8 numeros";
    if(isNaN(Number(phoneNumber))) errors.phoneIsNan = "Alguno de los valores no es un número";
    if(!regexImage.test(image)) errors.image = "La imagen acepta formatos jpg, jpeg, gif y png";
    if(!regexEmail.test(email)) errors.email = "Email invalido";

    return errors;
};

const AddUser = () => {
    const [loading, setLoading] = useState(false);
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
    
        data.append('file', files[0]);
        data.append('upload_preset', 'magqqp6o');
       
        setLoading(true);
        const res = await fetch("https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload", { method: "POST", body: data })
        const file = await res.json();
        
        setInput({ ...input, file: file.secure_url });
        setLoading(false)
    };
    const typeUser = ["Jefe", "Supervisor", "Guardia"];
    const [input, setInput] = useState({
        file: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        dni: '',
        rol: [],
        file: '',
        image: ''
    });
    const [error, setError] = useState({allFields: 'Todos los campos son requeridos'});
    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    };
    
    const handleSelect = (e) => {
        const {value} = e.target;
        if(!input.rol.includes(value) && input.rol.length < 1) {
            e.preventDefault();
            setInput({
                ...input,
                rol: [value]
            });
            setError(validate({
                ...input,
                rol: [value]
            }));
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput({
            name: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            dni: '',
            rol: [],
            file: '',
            image: ''
        });
        console.log('Deberia mandar los datos del form al back')
    };

    return (
        <>
            <h2 className="text-3xl text-gray-700 font-bold mb-5">Agregar Nuevo</h2>
            <form onSubmit={handleSubmit}> 
                <div>
                    <label htmlFor="inputName">Nombre: </label>
                    <input id="inputName" className="bg-blue-50" name="name" value={input.name} onChange={handleChange}></input>
                    {error.name && <small>{error.name}</small>}
                </div>
                <div>
                    <label htmlFor="inputLastName">Apellido: </label>
                    <input id="inputLastName" className="bg-blue-50" name="lastName" value={input.lastName} onChange={handleChange}></input>
                    {error.lastName && <small>{error.lastName}</small>}
                </div>
                <div>
                    <label htmlFor="inputDni">DNI: </label>
                    <input id="inputDni" className="bg-blue-50" name="dni" value={input.dni} onChange={handleChange}></input>
                    {error.dniFormat && <small>{error.dniFormat}</small>}
                </div>
                <div>
                    <label htmlFor="inputAdress">Domicilio: </label>
                    <input id="inputAdress" className="bg-blue-50" name="address" value={input.address} onChange={handleChange}></input>
                    {error.address && <small>{error.address}</small>}
                </div>
                <div>
                    <label htmlFor="inputPhoneNumber">Telefono: </label>
                    <input id="inputPhoneNumber" className="bg-blue-50" type="tel" name="phoneNumber" value={input.phoneNumber} onChange={handleChange}></input>
                    {error.phoneIsNan && <small>{error.phoneIsNan}</small>}
                </div>
                <div>
                    <label htmlFor="inputMail">Mail: </label>
                    <input id="inputMail" className="bg-blue-50" name="email" value={input.email} onChange={handleChange}></input>
                    {error.email && <small>{error.email}</small>}
                </div>
                <div>
                    <label htmlFor="inputImage">Imagen: </label>
                    <input id="inputImage" className="bg-blue-50" name="image" value={input.image} placeholder="url de imagen" onChange={handleChange}></input>
                    <input type="file" name="file" onChange={uploadImage}></input>
                    {error.image && <small>{error.image}</small>}
                </div>
                <div>
                    <label htmlFor="inputSelect">Rol: </label>
                    <select id="inputSelect" onChange={(e)=>{handleSelect(e)}} className="bg-blue-50">
                        {input.rol.length ?
                        <option key="select" >Seleccionar Rol</option> :
                        <option key="select" disabled selected>Seleccionar Rol</option>
                        }
                        {typeUser?.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
                {
                    Object.keys(error).length ?
                    <button className="bg-red-100" type="submit" disabled={true}>Agregar</button>:
                    <button className="bg-green-100" type="submit">Agregar</button>
                }
                {error.allFields && <small>{error.allFields}</small>}
            </form>
        </>
    );
};

export default AddUser;