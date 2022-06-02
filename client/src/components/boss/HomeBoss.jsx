import React from 'react'
import { Link, useParams } from "react-router-dom"

export default function HomeBoss() {
    const { id } = useParams();
    return (
        <div>
            <Link to="/home/add">
                <button>Add User</button>
            </Link>
        </div>
    )

}