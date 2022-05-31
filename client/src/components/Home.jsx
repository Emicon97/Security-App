import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Home(){

    const { isAuthenticated, user } = useAuth0();
    console.log(isAuthenticated)
    if(isAuthenticated){
        return(<h1>Esta persona esta identificada</h1>)
    } else return( <h1>Esta persona no esta identificada</h1> )
}