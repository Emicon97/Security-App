export default function TableEmployees({ name, employees }) {
    return (
        <>
            <div className="head">
                <h3>{name}</h3>
                <label htmlFor="">
                    <button>🔎</button>
                    <input type="text" placeholder={`buscar ${name}`} />
                </label>
            </div>
            <div className="list-employees">
                {
                    !!employees.length
                    ? employees.map(el => <div>{el.name}</div>)
                    : <h4>No tiene empleados</h4> 
                }
            </div>
        </>
    )
}