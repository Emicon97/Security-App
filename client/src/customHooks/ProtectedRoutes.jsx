import React from "react";
import { Navigate } from "react-router-dom";
import HomeBoss from "../components/boss/HomeBoss";
import TableInfoSupervisors from "../components/supervisor/TableInfoSupervisors";

// funcion para mostrar el home adecuado segun el rol, recibe tres props
// user es el usuario (esto es necesario solo para la ruta "/guard/:id", sino solo podría ser un boolean)
// redirectPath es opcional y sirve para redireccionar a una ruta especifica si no está permitido (por default redirige a "/")
// roles es el rol del usuario
export function UseProtectedRouteHome ({
    user,
    redirectPath = '/',
    roles,
  }) {
    
    if(!user) {
        return <Navigate to={redirectPath}/>
    } else {
        if(roles === "boss") {
            return <HomeBoss/>
        } else if (roles === "supervisor") {
            return <TableInfoSupervisors/>
        } else if (roles === "watcher") {
            return <Navigate to={`/guard/${user.id}`}/>
        } else {
            return <Navigate to={redirectPath}/>
        }
    }

};

// funcion que se le pasa por props tres valores.
// isAllowed es un boolean para saber si está permitido en esta ruta
// redirectPath es opcional y sirve para redireccionar a una ruta especifica si no está permitido (por default redirige a "/")
// children es el componente que será renderizado
export function UseProtectedRoutes ({
    isAllowed,
    redirectPath = '/',
    children,
}) {
    if(!isAllowed) {
        return <Navigate to={redirectPath}/>
    } else {
        return children
    }
}
