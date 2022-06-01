import React from 'react';
import HomeBoss from "./boss/HomeBoss";
import GuardProfile from "./guard/GuardProfile";
import TableInfoSupervisors from "./supervisor/TableInfoSupervisors";

export default function Home ({rol}) {
    console.log(rol)
    let home;
    if (rol === "boss") {
        home = <HomeBoss/>;
    } else if (rol === "supervisor") {
        home = <TableInfoSupervisors/>;
    } else if (rol === "watcher") {
        home = <GuardProfile/>;
    }

<<<<<<< HEAD
    const { isAuthenticated, user } = useAuth0();
    if(isAuthenticated){
        return(<h1>Esta persona esta identificada</h1>)
    } else return( <h1>Esta persona no esta identificada</h1> )
=======
    return (
        home
    )
>>>>>>> 82a11c1b8729420be7ed809dc710beafd6dd5b0f
}