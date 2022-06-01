import React,{useDeferredValue, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployees } from "../../redux/actions";
import './TableInfo.css';

export default function TableInfo(){
const dispatch = useDispatch();
const employees = useSelector(state=>state.employees);
const {id} = useParams();

useEffect(()=>{
    dispatch(getEmployees(id))
},[dispatch])


    return (
        <div className="datatable-container">
            {console.log(employees)}
            <div className="header-tools">
                <div className="tools">
                    <ul>
                        <li><span><input type="checkbox"/></span></li>
                        <li>
                            <button>
                                <i className="material-icons">add_circle</i>
                            </button>
                        </li>
                        <li>
                            <button>
                                <i className="material-icons">edit</i>
                            </button>
                        </li>
                        <li>
                            <button>
                                <i className="material-icons">delete</i>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="search">
                    <input type='text' placeholder="Search name" className="search-input"></input>
                </div>
            </div>
            <table className="datatable">
                <thead>
                    <tr>
                        <th>Marcar</th><th>Nombre</th><th>Environment</th><th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="table-checkbox"><input type="checkbox"/></td>
                        <td>Juan Perez</td>
                        <td>Lugar de trabajo</td>
                        <td><button><i className="material-icons">edit</i></button></td>
                    </tr>
                    <tr>
                        <td className="table-checkbox"><input type="checkbox"/></td>
                        <td>Pedro Rodriguez</td>
                        <td>Lugar de trabajo</td>
                        <td><button><i className="material-icons">edit</i></button></td>
                    </tr>
                    <tr>
                        <td className="table-checkbox"><input type="checkbox"/></td>
                        <td>Jose Lopez</td>
                        <td>Lugar de trabajo</td>
                        <td><button><i className="material-icons">edit</i></button></td>
                    </tr>
                    <tr>
                        <td className="table-checkbox"><input type="checkbox"/></td>
                        <td>Luis Diaz</td>
                        <td>Lugar de trabajo</td>
                        <td><button><i className="material-icons">edit</i></button></td>
                    </tr>
                    <tr>
                        <td className="table-checkbox"><input type="checkbox"/></td>
                        <td>Marcos Juarez</td>
                        <td>Lugar de trabajo</td>
                        <td><button><i className="material-icons">edit</i></button></td>
                    </tr>
                </tbody>
            </table>
            <div className="footer-tools">
                <div className="list-items">
                    Show
                    <select name="n-entries" id="n-entries" className="n-entries">
                        <option value="20">20</option>
                        <option value="10">10</option>
                        <option value="5">5</option>
                    </select>
                    entries
                </div>
                <div className="pages">
                    <ul>
                        <li><span className="active">1</span></li>
                        <li><button>2</button></li>
                        <li><button>3</button></li>
                        <li><button>4</button></li>
                        <li><span>...</span></li>
                        <li><button>11</button></li>
                        <li><button>12</button></li>
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}