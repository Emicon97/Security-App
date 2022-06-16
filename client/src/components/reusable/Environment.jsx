import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEnvironments, createEnvironments, getEnvironmentUsers } from './../../redux/actions';
import LoginController from './LoginController';
import { useState } from 'react';

import { Input } from "../styles/Buttons";
import swal from "sweetalert";
import '../styles/reusable/Environment.css'

export default function Environment({show}) {
   const dispatch = useDispatch();
   const allEnvironments = useSelector((state)=>state.environments);
   const header = LoginController();
   const user = localStorage.getItem('user');
   const id = localStorage.getItem('id');
   const environmentUser = useSelector((state) => state.environmentUsers);
   const environments = allEnvironments.map(r => r.name)
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
         } else if(environments.includes(input.name.toLocaleLowerCase())) {
            errors.name = "This environment already exists"
         }
         return errors;
      }
   

   function handleSubmit(e){
      e.preventDefault()
      if(allEnvironments.includes(input.name)) return swal("Error", "The name is already exist", "error")
      if(Object.keys(errors).length === 0){
         dispatch(createEnvironments(input, header))
         setInput({name: ""})
         swal("Environment created successfully", "", "success")
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
      <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700 font-['nunito'] overflow-y-auto`}>
         { 
            user === 'boss' ? 
            <>
               <form onSubmit={(e)=>handleSubmit(e)} className="w-[72%] m-auto mt-[15px] mb-[15px] rounded-2xl p-[15px] shadow shadow-gray-300">
                  <div className="flex flex-row justify-between">
                     <h2 className="font-semibold flex"><p className="text-[#ff5cf4]">A</p>dd New Enviromen<p className="text-[#0023c4]">t</p></h2>
                     <button title="Submit new environment" type="submit" className="h-5 w-5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#0023c4">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                     </button>
                  </div>
                  <div>
                     <label htmlFor="" className="flex flex-row items-center font-medium">Name: {errors.name && <small className="text-red-500 italic ml-1 mt-[3px]">{errors.name}*</small>}</label>
                     <input type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} placeholder="Name..." className={`${Input} w-[94%]`} />
                  </div>
               </form>
            </> : 
            null
         }
         <div className={`w-[72%] m-auto font-semibold flex flex-row items-center justify-between ${user !== 'boss' ? 'mt-[20px] bg-[#0023c480] rounded-xl' : ''} p-[5px]`}>
            <label className={`${user !== 'boss' ? 'text-white' : ''}`}>Select an environment:</label>
            <select onChange={handleChangeEnvironment} className={`${Input('Select')} m-0 string-uppercase`}>
               <option value="select" hidden>Environment</option>
               {allEnvironments.length!==0?allEnvironments.map(e => (<option value={e.name}>{e.name}</option>)): null}
               <option value="select">Clear</option>
            </select>
         </div>
         {
            environmentUser.length !== 0 ? 
            environmentUser.map(e => {
               return (
                  <div className="w-[72%] m-auto rounded-2xl mt-[15px] p-[15px] shadow shadow-gray-300">
                     <h3 className="flex string-uppercase">{e.name}:
                        {
                           user === 'boss' ?
                           <><p className="italic text-[#ffbbc4] font-semibold mx-1 mr-2">Supervisors</p>and<p className="italic text-[#506be1] font-semibold mx-1">Watchers</p></> :
                           <p className="italic text-[#506be1] font-semibold mx-1">Watchers</p>
                        }
                     </h3>
                     <div className="flex flex-row justify-around text-white font-semibold">
                        {
                           user === 'boss' ?
                           <div className="rounded-xl bg-[#fdced4] p-[5px] w-[48%] flex flex-col items-center">
                              {
                                 e.supervisor.length > 0 ?
                                 e.supervisor.map(e => 
                                    (<p className="truncate string-uppercase">{e.name} {e.lastName}</p>)
                                 ) :
                                 <div className="rounded-xl bg-[#fdced4] p-[5px] w-full flex items-center justify-center">There are not Supervisors in this environment</div>
                              }
                           </div> :
                           null
                        }
                        {
                           e.watcher.length > 0 ?
                           <div className="rounded-xl bg-[#0023c480] p-[5px] w-[48%] flex flex-col items-center">
                              {
                                 e.watcher.map(e => 
                                    (<p className="truncate string-uppercase">{e.name} {e.lastName}</p>)
                                 )
                              }
                           </div> :
                           <div className="rounded-xl bg-[#0023c480] p-[5px] w-[48%] flex items-center justify-center">There are not Watchers in this environment</div>
                        }
                     </div>
                  </div>
               )
            }) : 
            null
         }
      </div>
   ) 
}