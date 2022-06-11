import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToDosById } from "../../redux/actions";

import aos from "aos";
import 'aos/dist/aos.css'
import './../styles/reusable/ViewTasksHome.css'
import { Link } from "react-router-dom";


export default function ViewTasksHome({ id, header }) {
    let dispatch = useDispatch()
    const ToDos = useSelector((state) => state.todosId);
    const [scrollX, setscrollX] = useState(0);
    const [scrolEnd, setscrolEnd] = useState(false);
    const scrl = useRef(null)

    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
        setscrollX(scrollX + shift);
        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };

    const scrollCheck = () => {
        setscrollX(scrl.current.scrollLeft);
        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };

    useEffect(() => {
        dispatch(getToDosById(id, header));
        aos.init({ duration: 700 })
    }, [dispatch]);

    useEffect(() => {
        if (
            scrl.current &&
            scrl?.current?.scrollWidth === scrl?.current?.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
        return () => { };
    }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);
    
    
    return (
        <div className="task-summary">
            <h3>Tarea<span>s</span></h3>



            <div className="screen-tasks-horizontal">


                <ul ref={scrl} onScroll={scrollCheck}>
                    {
                        ToDos.length 
                        ? ToDos.map(task => (
                            <Link to={`/supervisor/${id}/tasks`}>
                            <li key={task._id} 
                                className={task.priority} 
                                data-aos="zoom-in"
                            >
                                <div className="head">
                                    <h6 className={task.priority}>
                                        {task.priority}
                                    </h6>
                                    <h6 className={task.status}>
                                        {task.status}
                                    </h6>
                                </div>

                                <div className="middle">
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                </div>
                            </li>
                                </Link>
                        )) 
                        : null
                    }
                </ul>


            </div>

            <div className="buttons-tasks">

                <div className="btn">

                    {scrollX !== 0 && (
                        <button className="prev" onClick={() => slide(-200)}>
                            prev
                        </button>
                    )}

                </div>

                <div className="btn">

                    {!scrolEnd && (
                        <button className="next" onClick={() => slide(+200)}>
                            next
                        </button>
                    )}

                </div>

            </div>



        </div>

    )

}