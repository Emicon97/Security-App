
export default function TableInfoSupervisors() {

    let datos = [
        {
            supervisor: "Pepe",
            puesto: "escuela",
            employes: [
                { name: "jose", lastName: "martinez" },
                { name: "tomas", lastName: "vegara" },
                { name: "riki", lastName: "lopez" },
            ]
        },
        {
            supervisor: "Paco",
            puesto: "edificio",
            employes: [
                { name: "leon", lastName: "messi" },
                { name: "ben", lastName: "diez" },
                { name: "Javier", lastName: "Milei" },
                { name: "goku", lastName: "son" },
            ]
        },
        {
            supervisor: "Coscu",
            puesto: "barrio",
            employes: [],
        }
    ]

    let handleTable = (event)  => {
        // console.log(event.target.id)
        let table = document.querySelector(`.${event.target.id}`)
        // console.log(table)
        if(table.style.display === "none") {
            table.style.display = "block"
        } else {
            table.style.display = "none"
        }
         
    }


    return (
        <div className="container max-w-5xl mx-auto flex flex-col justify-between m-10">

            {
                datos.map((e, i) => {
                    return (
                        <div id={`seupervisor-table-guardias-${i}`} className="" style={{width:"80%", margin:" 10px auto", backgroundColor:"red"}}>
                            <div key={i} style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                <h3>{e.supervisor}</h3>
                                <p>{e.puesto}</p>
                                <button id={`table-guardias-${i}`} onClick={handleTable}>guardias</button>
                            </div>
                            <div className={`table-guardias-${i}`} style={{display:`${"none"}`}}>
                                {
                                    e.employes.length > 0 
                                    ? (
                                        <ul>
                                            {e.employes.map(e => <li>{`Nombre: ${e.name} ${e.lastName}`}</li>)}
                                        </ul>
                                    )
                                    : <p>No tiene empleados</p>
                                }
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )

}