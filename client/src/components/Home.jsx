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

    return (
        home
    )
}