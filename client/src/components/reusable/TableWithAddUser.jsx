import React from 'react';
import { Link, useParams } from "react-router-dom";
import TableInfo from "../reusable/TableInfo";
import { Primary } from "../styles/Buttons";

export default function HomeBoss() {
    const { id } = useParams();
    return (
        <div className='flex flex-col items-center justify-center'>
            <TableInfo id={id} />
            <Link to="/user/add">
                <button className={`mx-auto my-5 ${Primary()}`}>Add User</button>
            </Link>
        </div>
    );
}