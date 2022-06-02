import { useEffect, useState } from "react"


export default function TableEmployees({ name, employees }) {

    let [value, setValue] = useState('');
    let [allEmployees, setAllEmployees] = useState(employees)

    useEffect(() => {
        setAllEmployees(employees)
        console.log(allEmployees, "useEffect")
    }, [employees])
    useEffect(() => {
        console.log(allEmployees)        
    }, [allEmployees])


    let handleSubmit = (event) => {
        event.preventDefault();
        let arrFilter = allEmployees.filter(e => e.includes(value));
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
                        {/* <input type="submit" value="🔎" /> */}
                        <input type="text" value={value} placeholder={`buscar ${name}`} onChange={handleChange}/>
                    </label>

                </form>
            </div>
            <div className="list-employees">
                {
                    allEmployees.length
                    ? allEmployees.map(el => <div key={el}>{el}</div>)
                    : <h4>No tiene empleados</h4> 
                }
            </div>
        </>
    )
}