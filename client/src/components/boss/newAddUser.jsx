import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import demo from "../../assets/demo.png";

export default function AddUser() {
    const dispatch = useDispatch()
    const typeUser = ["boss", "supervisor", "watcher"];
    const [formSend, setFormSend] = useState(false);

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false);
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
    
        data.append('file', files[0]);
        data.append('upload_preset', 'magqqp6o');
    console.log(data)
        setLoading(true);
        const res = await fetch("https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload", { method: "POST", body: data })
        const file = await res.json();
    console.log(file)
    
        setImage(file.secure_url);
        setLoading(false)
    };

    const viewPassword = ()=>{
        var x = document.getElementById('password');
        x.type === 'password' ? x.type = 'text' : x.type = 'password'
    }

return (

<Formik
initialValues={{
            name: '',
            lastName:'',
            password:'',
            dni:'',
            role:'',
            profilePic:'',
            email:'',
            address:'',
            environment:'',
            phoneNumber:'',
            workingHours:''

}}
validate={(val)=>{
    let errors = {};
    if(!val.name) {errors.name = "Por favor ingresa un nombre"}
    else if(!/^[a-zA-Z ]*$/.test(val.name)) {errors.name = "Solo se aceptan letras y espacios"}

    if(!val.lastName) {errors.lastName = "Por favor ingresa un apellido"}
    else if(!/^[a-zA-Z ]*$/.test(val.lastName)) {errors.lastName = "Solo se aceptan letras y espacios"}

    if(!val.password) {errors.password = "Por favor ingresa una contraseña"}

    if(!val.workingHours) {errors.workingHours = "Por favor ingresa las horas de trabajo"}

    if(!val.environment) {errors.environment = "Por favor ingresa lugar de trabajo"}

    if(!val.role) {errors.role = "Por favor ingresa un rol"}

    if(!val.profilePic) {errors.profilePic = "Por favor ingresa una imagen"}

    if(!val.dni) {errors.dni = "Por favor ingresa un DNI"}
    else if(isNaN(Number(val.dni)) || val.dni.length < 8 || val.dni.length > 8) {errors.dni = "El formato debe ser de 8 numeros"}

    if(!val.address) {errors.address = "Por favor ingresa una direccion"}
    else if(!/^[A-Za-z0-9\s]+$/.test(val.address)) errors.address = "Solo se aceptan números, letras y espacios";

    if(!val.phoneNumber) {errors.phoneNumber = "Por favor ingresa un telefono"}
    else if(isNaN(Number(val.phoneNumber))) errors.phoneNumber = "Alguno de los valores no es un número";
    return errors;
}}
onSubmit ={(values, {resetForm})=>{
    dispatch(postUser(values));
    console.log(values)
    setFormSend(true);
    resetForm();
    setTimeout(()=>setFormSend(false),5000)
}}
>
{( {errors, values} ) => (
    <Form className="flex flex-col items-center">
        {console.log(values)}
        <div className={Div()}>
            <label htmlFor="name">Nombre</label>
            <Field 
            className={Input()}
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"/>
            <ErrorMessage name="name" component={()=>(<small className="text-red-600">{errors.name}</small>)}/>
        </div>
        <div>
            <label htmlFor="lastName">Apellido</label>
            <Field
            className={Input()}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Apellido"/>
            <ErrorMessage name="lastName" component={()=>(<small className="text-red-600">{errors.lastName}</small>)}/>
        </div>
        <div className={Div()}>
            <label htmlFor="password">Contraseña</label>
            <Field
            className={Input()}
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"/>
            <input type="checkbox" onClick={viewPassword}/>Ver contraseña
            <ErrorMessage name="password" component={()=>(<small className="text-red-600">{errors.password}</small>)}/>
        </div>
        <div>
            <label htmlFor="dni">Dni:</label>
            <Field
            className={Input()}
            type="number"
            id="dni"
            name="dni"
            placeholder="Dni"/>
            <ErrorMessage name="dni" component={()=>(<small className="text-red-600">{errors.dni}</small>)}/>
        </div>
        <div className={Div()}>
            <label htmlFor="address">Direccion: </label>
            <Field
            className={Input()}
            type="text"
            id="address"
            name="address"
            placeholder="Direccion"/>
            <ErrorMessage name="address" component={()=>(<small className="text-red-600">{errors.address}</small>)}/>
        </div>
        <div>
            <label htmlFor="email">Email: </label>
            <Field
            className={Input()}
            type="text"
            id="email"
            name="email"
            placeholder="Email"/>
            <ErrorMessage name="email" component={()=>(<small className="text-red-600">{errors.email}</small>)}/>
        </div>
        <div className={Div()}>
            <label htmlFor="phoneNumber">Telefono: </label>
            <Field
            className={Input()}
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Telefono"/>
            <ErrorMessage name="phoneNumber" component={()=>(<small className="text-red-600">{errors.phoneNumber}</small>)}/>
        </div>
        <div>
            <label htmlFor="workingHours">Horas de trabajo: </label>
            <Field
            className={Input()}
            type="text"
            id="workingHours"
            name="workingHours"
            placeholder="Horas de trabajo"/>
            <ErrorMessage name="workingHours" component={()=>(<small className="text-red-600">{errors.workingHours}</small>)}/>
        </div>
        <div>
            <label htmlFor="environment">Entorno de trabajo: </label>
            <Field
            className={Input()}
            type="text"
            id="environment"
            name="environment"
            placeholder="Entorno de trabajo"/>
            <ErrorMessage name="environment" component={()=>(<small className="text-red-600">{errors.environment}</small>)}/>
        </div>
        <div>
            <label>Rol: </label>
            <Field name="role" as="select">
            {
                !values.role.length ?
                <option key="select">Seleccionar</option> :
                <option key="select" disabled >Seleccionar</option>
            }
            {typeUser?.map(e => <option key={e} value={e}>{e}</option>)}
            </Field>
            <ErrorMessage name="role" component={()=>(<small className="text-red-600">{errors.role}</small>)}/>
        </div>
        <div>
        <div>
            <Field className={File()} type="file" name="file" onChange={(e)=>uploadImage(e)}/>
            {loading ? (<img src={demo} className='w-10 h-10' />) : ((values.profilePic = image), <img className='w-10 h-10' src={image} style={{widht: '100px'}}/>)}
        </div>
        <ErrorMessage name="file" component={()=>(<small className="text-red-600">{errors.profilePic}</small>)}/>
        </div>
        <button className={Button()} type="submit">Agregar</button>
        {formSend && (<small className="text-green-600">Usuario creado con exito</small>)}
    </Form>
)}
</Formik>

)
}const Div = (props) => `
flex flex-row items-center justify-between
label:text-red-500
`;

const Input = (props) => `
hover:bg-slate-100
placeholder:italic placeholder:text-slate-400 
block bg-white w-${props === 'Select' ? '48' : '96'} m-2.5
border border-slate-300 rounded-md 
py-2 pl-3 pr-3 shadow-sm 
focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 
sm:text-sm
`;

const File = (props) => `
block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-blue-50 file:text-blue-700
hover:file:bg-blue-100
`;


const Button = (props) => `
font-bold text-white
bg-blue-500
w-32 h-10 p-0 m-0
border-2 border-blue-500
hover:border-blue-600 hover:bg-blue-600
active:border-blue-700 active:bg-blue-700
rounded-3xl
`;
