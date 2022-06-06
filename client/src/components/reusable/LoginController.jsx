import { useSelector } from 'react-redux';

function LoginController(){
 const header = useSelector(state => state.token)
 console.log(header, "desde el logincontroller")
return(
    {headers:{'auth-token':header}}
)}

export default LoginController;