import React from 'react'
import { useEffect, useState } from "react"


export default function TableEmployees({ name, employees }) {

    let [value, setValue] = useState('');
    let [allEmployees, setAllEmployees] = useState(employees)

    useEffect(() => {
        setAllEmployees(employees)
    }, [employees])
    useEffect(() => {

    }, [allEmployees])

    let handleSubmit = (event) => {
        event.preventDefault();
        let arrFilter = allEmployees.filter(employee => employee.name === value);
        setAllEmployees(arrFilter)
    }
    let handleChange = (event) =>{
        setValue(event.target.value)
    }
    let handleRestart = () => {
        setAllEmployees(employees)
    }
    return (
        <>
            <div className="head">
                <h3>{name}</h3>
                <button onClick={handleRestart}>Restart</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">
                        <button type="submit">🔎</button>
                        <input type="text" value={value} placeholder={`buscar ${name}`} onChange={handleChange}/>
                    </label>

                </form>
            </div>
            <div className="list-employees">
                {
                    allEmployees
                    ? allEmployees.map(employee => <div key={employee._id}>{employee.name} {employee.lastName}</div>)
                    : <h4>No tiene empleados</h4> 
                }
            </div>
        </>
    )
}