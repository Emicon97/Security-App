

function LoginController(){
    const header = localStorage.getItem('auth-token')
return(
    {headers:{'auth-token':header}}
)}

export default LoginController;