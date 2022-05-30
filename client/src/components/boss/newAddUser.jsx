import React, {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import demo from "../../assets/demo.png";

export default function AddUser() {
    const typeUser = ["Jefe", "Supervisor", "Guardia"];
    const [formSend, setFormSend] = useState(false);
    const [image, setImage]= useState('');

    const [loading, setLoading] = useState(false);
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
    
        data.append('profilePic', files[0]);
        data.append('upload_preset', 'magqqp6o');
        {console.log(data)}
        setLoading(true);
        const res = await fetch("https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload", { method: "POST", body: data })
        const file = await res.json();
        
        setImage( file.secure_url );
        setLoading(false)
    };

return (

<Formik
initialValues={{
            name: '',
            lastName: '',
            password: '',
            workingHours: '',
            environment: '',
            email: '',
            phoneNumber: '',
            address: '',
            dni: '',
            role: '',
            image: '',
            profilePic: image
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
onSubmit ={(val, {resetForm})=>{
    resetForm();
    setFormSend(true);
    setTimeout(()=>setFormSend(false),5000)
}}
>
{( {errors, values} ) => (
    <Form>
        {console.log(values)}
        <div>
            <label htmlFor="name">Nombre</label>
            <Field
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"/>
            <ErrorMessage name="name" component={()=>(<small className="text-red-600">{errors.name}</small>)}/>
        </div>
        <div>
            <label htmlFor="lastName">Apellido</label>
            <Field
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Apellido"/>
            <ErrorMessage name="lastName" component={()=>(<small className="text-red-600">{errors.lastName}</small>)}/>
        </div>
        <div>
            <label htmlFor="password">Contraseña</label>
            <Field
            type="text"
            id="password"
            name="password"
            placeholder="Contraseña"/>
            <ErrorMessage name="password" component={()=>(<small className="text-red-600">{errors.password}</small>)}/>
        </div>
        <div>
            <label htmlFor="lastName">Dni:</label>
            <Field
            type="number"
            id="dni"
            name="dni"
            placeholder="Dni"/>
            <ErrorMessage name="dni" component={()=>(<small className="text-red-600">{errors.dni}</small>)}/>
        </div>
        <div>
            <label htmlFor="address">Direccion: </label>
            <Field
            type="text"
            id="address"
            name="address"
            placeholder="Direccion"/>
            <ErrorMessage name="address" component={()=>(<small className="text-red-600">{errors.address}</small>)}/>
        </div>
        <div>
            <label htmlFor="phoneNumber">Telefono: </label>
            <Field
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Telefono"/>
            <ErrorMessage name="phoneNumber" component={()=>(<small className="text-red-600">{errors.phoneNumber}</small>)}/>
        </div>
        <div>
            <label htmlFor="workingHours">Horas de trabajo: </label>
            <Field
            type="text"
            id="workingHours"
            name="workingHours"
            placeholder="Horas de trabajo"/>
            <ErrorMessage name="workingHours" component={()=>(<small className="text-red-600">{errors.workingHours}</small>)}/>
        </div>
        <div>
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
                <Field type="file" name="profilePic" onChange={uploadImage}></Field>
            {loading ? <img src={values.profilePic} /> : <img src={demo} className='w-10 h-10' />  }
        </div>
        <ErrorMessage name="profilePic" component={()=>(<small className="text-red-600">{errors.profilePic}</small>)}/>
        </div>
        <button type="submit">Agregar</button>
        {formSend && (<small className="text-green-600">Usuario creado con exito</small>)}
    </Form>
)}
</Formik>

)
}