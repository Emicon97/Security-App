import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEnvironments, createEnvironments, getEnvironmentUsers } from './../../redux/actions';
import LoginController from './LoginController';
import { useState } from 'react';

import { Primary, Input, File } from "../styles/Buttons";

export default function Environment({show}) {
   const dispatch = useDispatch();
   const allEnvironments = useSelector((state)=>state.environments)

   const header = LoginController();
   console.log("header",header)
   const user = localStorage.getItem('user');
   const id = localStorage.getItem('id');

   const environmentUser = useSelector((state) => state.environmentUsers);
   console.log('enviromentUsers',environmentUser)
   const [input, setInput] = useState({name: ""})
   const [name, setName] = useState("")
   function handleChange(e) {
      console.log(input)
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

   function handleSubmit(e){
      e.preventDefault()
      dispatch(createEnvironments(input, header))
   }
   console.log('name Input',name)
   function handleChangeEnvironment(e){
      e.preventDefault()
      setName(e.target.value)
   }
   useEffect(() => {
      dispatch(getAllEnvironments(header));
   }, []);
   useEffect(()=>{
      dispatch(getEnvironmentUsers(id,name,header))
   },[id,name,header])
   return (

      <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>
         { user === 'boss' ?<>
         <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
               <h2>Add New Enviroment</h2>
            </div>
            <div>
               <label htmlFor="">Name:</label><input type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} />
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
            {allEnvironments.length!==0?allEnvironments.map(e=>{
               return (<button value={e.name} onClick={e=>handleChangeEnvironment(e)}>{e.name}</button>)
            }):<h3>Loading...</h3>
            }
         </div>
      </div>

   ) 
}