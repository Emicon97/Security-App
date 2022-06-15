import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEnvironments, createEnvironments, getEnvironmentUsers } from './../../redux/actions';
import LoginController from './LoginController';
import { useState } from 'react';

import { Primary } from "../styles/Buttons";

export default function Environment({show}) {
   const dispatch = useDispatch();
   const allEnvironments = useSelector((state)=>state.environments)
   const header = LoginController();
   const user = localStorage.getItem('user');
   const id = localStorage.getItem('id');
   const environmentUser = useSelector((state) => state.environmentUsers);
   
   const [input, setInput] = useState({name: ""})
   const [errors, setErrors] = useState({})
   const [name, setName] = useState("")
  
   function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      })
      setErrors(validateForm({[e.target.name]: e.target.value}))
    }

   function validateForm (input) {
      let errors ={};
         if(input.name === ""){
           errors.name = "Name is required"
         } else if(input.name.length < 3){
            errors.name= "Name must contain more than 3 characters" 
         }
         return errors;
      }
   

   function handleSubmit(e){
      e.preventDefault()
      if(Object.keys(errors).length === 0){
         dispatch(createEnvironments(input, header))
         setInput({name: ""})
      }
   }
   function handleChangeEnvironment(e){
      e.preventDefault()
      setName(e.target.value)
   }

   useEffect(() => {
      setErrors(validateForm(input))
   },[input])

   useEffect(() => {
      dispatch(getAllEnvironments(header));
   }, []);
   useEffect(()=>{
      dispatch(getEnvironmentUsers(id,name,header))
   },[id,name])
   return (

      <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>
         { user === 'boss' ? <>
         <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
               <h2>Add New Enviroment</h2>
            </div>
            <div>
               <label htmlFor="">Name:</label><input type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} />
               {errors.name && <p>{errors.name}</p>}
            </div>
            <button
               type="submit"
                 
               className={`${Primary()} m-auto`}
               >
               Add Environment
            </button>
         </form>
         </>: null}
         <div>
            <label>
               Environments:
               <select onChange={handleChangeEnvironment}>
                  <option value="select">Select Environment</option>
                  {allEnvironments.length!==0?allEnvironments.map(e => (<option value={e.name}>{e.name}</option>)): null}
               </select>
            </label>
         </div>
         <div>
            {
               environmentUser.length !==0? environmentUser.map(e=> {
                  return (<div>
                        <h3>{e.name}</h3>
                        {e.supervisor.length && user === 'boss' ? <p>Supervisores: </p>: null}
                    {e.supervisor? e.supervisor.map(e => (<div><p>{e.name} {e.lastName}</p></div>)): null}
                     {e.watcher.length ? <p>Watcher: </p>: null}
                    {e.watcher?e.watcher.map(e => (<div><p>{e.name} {e.lastName}</p></div>)): "nada"}
                      </div>)
               }): null
            }
         </div>
      </div>

   ) 
}