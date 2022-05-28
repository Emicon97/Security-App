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
    
    if(checkUndefined(input)) errors.allFields= 'Todos los campos son requeridos *';
    if(!regexAddress.test(address)) errors.address = "Solo se aceptan números, letras y espacios *";
    if(!regexName.test(name)) errors.name = "Solo se aceptan letras y espacios *";
    if(!regexName.test(lastName)) errors.lastName = "Solo se aceptan letras y espacios *";
    if(isNaN(Number(dni)) || dni.length < 8 || dni.length > 8) errors.dniFormat = "El formato debe ser de 8 numeros *";
    if(isNaN(Number(phoneNumber))) errors.phoneIsNan = "Alguno de los valores no es un número *";
    if(!regexImage.test(image)) errors.image = "La imagen acepta formatos jpg, jpeg, gif y png *";
    if(!regexEmail.test(email)) errors.email = "Email invalido *";

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
    const [error, setError] = useState({allFields: 'All field are required'});
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
        <div className="flex flex-col items-center">
            <h2 className="text-5xl font-semibold font-sans m-2.5 mb-5">Register new user</h2>
            <form onSubmit={handleSubmit}>
                <div className={Div()}>
                    <div>
                        <label htmlFor="inputName">
                            Name: {error.name && <small className="text-red-600">{error.name}</small>}
                        </label>
                        <input className={Input()} placeholder='Name...' id="inputName" name="name" value={input.name} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="inputLastName">
                            Last name: {error.lastName && <small className="text-red-600">{error.lastName}</small>}
                        </label>
                        <input className={Input()} placeholder='Last name...' id="inputLastName" name="lastName" value={input.lastName} onChange={handleChange}></input>
                    </div>
                </div>
                <div className={Div()}>
                    <div>
                        <label htmlFor="inputDni">
                            DNI: {error.dniFormat && <small className="text-red-600">{error.dniFormat}</small>}
                        </label>
                        <input className={Input()} placeholder='DNI...' id="inputDni" name="dni" value={input.dni} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="inputAdress">
                            Address: {error.address && <small className="text-red-600">{error.address}</small>}
                        </label>
                        <input className={Input()} placeholder='Address...' id="inputAdress" name="address" value={input.address} onChange={handleChange}></input>
                    </div>
                </div>
                <div className={Div()}>
                    <div>
                        <label htmlFor="inputPhoneNumber">
                            Phone number: {error.phoneIsNan && <small className="text-red-600">{error.phoneIsNan}</small>}
                        </label>
                        <input className={Input()} placeholder='Phone number...' id="inputPhoneNumber" type="tel" name="phoneNumber" value={input.phoneNumber} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="inputMail">
                            Mail: {error.email && <small className="text-red-600">{error.email}</small>}
                        </label>
                        <input className={Input()} placeholder='Email...' id="inputMail" name="email" value={input.email} onChange={handleChange}></input>
                    </div>
                </div>
                <div className={Div()}>
                    <div>
                        <label htmlFor="inputImage">Picture: </label>
                        <input className={Input()} id="inputImage" name="image" value={input.image} placeholder="Image url..." onChange={handleChange}></input>
                    </div>
                    <div className="w-96 mt-5">
                        <input className={File} type="file" name="file" onChange={uploadImage}></input>
                        {error.image && <small className="text-red-600">{error.image}</small>}
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <label className="mr-5" htmlFor="inputSelect">User type: </label>
                    <select className={Input('Select')} id="inputSelect" onChange={(e) => {handleSelect(e)}}>
                        {
                            input.rol.length ?
                            <option key="select" >Select</option> :
                            <option key="select" disabled selected>Select</option>
                        }
                        {typeUser?.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
                <div className="flex justify-center m-2">
                    {
                        Object.keys(error).length ?
                        <button className={Button()} type="submit" disabled={true}>Done</button> :
                        <button className={Button()} type="submit">Done</button>
                    }
                </div>
                {/* {error.allFields && <small>{error.allFields}</small>} */}
            </form>
        </div>
    );
};

const Div = () => `
    flex flex-row items-center justify-between
    label:text-red-500
`;

const Input = (props) => `
    hover:bg-slate-100
    placeholder:italic placeholder:text-slate-400 
    block bg-white w-${props === 'Select' ? '32' : '96'} m-2.5
    border border-slate-300 rounded-md 
    py-2 pl-9 pr-3 shadow-sm 
    focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 
    sm:text-sm
`;

const File = `
    block w-full text-sm text-slate-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100
`;

const Button = () => `
    font-bold text-white
    bg-blue-500
    w-32 h-10 p-0 m-0
    border-2 border-blue-500
    hover:border-blue-600 hover:bg-blue-600
    active:border-blue-700 active:bg-blue-700
    rounded-3xl
`;

export default AddUser;