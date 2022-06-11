import React from 'react';
import { Link, useParams } from "react-router-dom";
import TableInfo from "../reusable/TableInfo";
import { Primary } from "../styles/Buttons";

export default function HomeBoss({show}) {
    return (
        <div className={`flex flex-col items-center justify-center fixed top-16 right-0 ${show ? 'w-10/12' : 'w-[94%]'} ease-in-out transition-all duration-700`}>
            <TableInfo />
            <Link to="/boss/add">
                <button className={`mx-auto my-5 ${Primary()}`}>Add User</button>
            </Link>
        </div>
    );
}