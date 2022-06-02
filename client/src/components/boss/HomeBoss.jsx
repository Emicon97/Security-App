import React from 'react';
import { Link, useParams } from "react-router-dom";
import TableInfo from "../supervisor/TableInfo";

export default function HomeBoss() {
    const { id } = useParams();
    return (
        <div>
            <Link to="/home/add">
                <button>Add User</button>
            </Link>
            <TableInfo id={id} />
        </div>
    )

}