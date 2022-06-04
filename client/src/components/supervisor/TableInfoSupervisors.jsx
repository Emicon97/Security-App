export default function TableInfoSupervisors() {
  let datos = [
    {
      supervisor: "Pepe",
      puesto: "escuela",
      employes: [
        { name: "jose", lastName: "martinez" },
        { name: "tomas", lastName: "vegara" },
        { name: "riki", lastName: "lopez" },
      ],
    },
    {
      supervisor: "Paco",
      puesto: "edificio",
      employes: [
        { name: "leon", lastName: "messi" },
        { name: "ben", lastName: "diez" },
        { name: "Javier", lastName: "Milei" },
        { name: "goku", lastName: "son" },
      ],
    },
    {
      supervisor: "Coscu",
      puesto: "barrio",
      employes: [],
    },
  ];

  //function para ocultar la tabla con guardias
  let handleTable = (event) => {
    let table = document.querySelector(`.${event.target.id}`);
    if (table.style.display === "none") {
      table.style.display = "block";
    } else {
      table.style.display = "none";
    }
  };

  return (
    <div className="container max-w-5xl mx-auto flex flex-col justify-between m-10">
      {
        //hago un div por cada supervisor existente
        datos.map((e, i) => {
          return (
            //div container
            <div
              id={`supervisor-table-guardias-${i}`}
              className="w-4/5 mx-auto my-3 rounded-2xl p-3 bg-[#EDF6FE]"
            >
              {/* div con info del supervisor */}
              <div
                key={i}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h3>{e.supervisor}</h3>
                <p>{e.puesto}</p>
                {/* boton para mostrar u ocultar guardias */}
                <button
                  id={`table-guardias-${i}`}
                  onClick={handleTable}
                  className="rounded-lg border-solid border-2 border-inherit ml-2 hover:bg-cyan-200 transition duration-500 ease-in-out"
                >
                  guardias
                </button>
              </div>

              {/* div con info de los guardias */}
              <div
                className={`table-guardias-${i}`}
                style={{ display: `${"none"}` }}
              >
                {
                  //verifico si el supervisor tiene guardias acargo
                  e.employes.length > 0 ? (
                    //si tiene, renderizo una lista con cada uno de ellos
                    <ul className="">
                      {e.employes.map((e) => (
                        <li>{`Nombre: ${e.name} ${e.lastName}`}</li>
                      ))}
                    </ul>
                  ) : (
                    //si no, muestro que no tiene guardias
                    <p>No tiene empleados</p>
                  )
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
