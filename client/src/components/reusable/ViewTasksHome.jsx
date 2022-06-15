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
        <div className="relative mr-auto my-5 ml-[30px] w-[90%] h-[330px] overflow-visible p-3.5 bg-[#fdced4] rounded-2xl flex flex-col">
            <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold font-['nunito'] text-white">Tasks</h1>
                <div className="flex items-center cursor-pointer">
                    <p title="List of tasks" className="font-extrabold font-['nunito'] text-white">More</p>
                    <svg title="List of tasks" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div ref={scrl} onScroll={scrollCheck} className="absolute top-[16%] bottom-2.5 left-2.5 w-[103%] mb-[-5px] overflow-x-hidden overflow-y-hidden flex">
                {
                    ToDos?.map((todo, i) => (
                        <Link to={`/supervisor/${id}/tasks`}>
                            <div title="Link to see the list of tasks" key={i}
                            data-aos="zoom-in"
                            className={`todo-tasks
                            ${todo.priority === 'urgent' ? 
                            'bg-[#FFE5E8] hover:bg-[#ffd5da]' : 
                            todo.priority === 'high' ? 
                            'bg-[#FFEFE4] hover:bg-[#ffe2cf]' : 
                            todo.priority === 'regular' ? 
                            'bg-[#ebffe5] hover:bg-[#d4ffc7]' : 
                            'bg-[#E8F1FF] hover:bg-[#cfe2ff]'}
                            flex h-[250px] w-[199px] rounded-2xl mr-2 cursor-pointer`}
                            >
                            <div className="h-full w-[90%] m-2.5 flex flex-col relative">
                                <div className="w-full flex items-center">
                                {
                                    todo.priority === 'urgent' ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#E8132A">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />                    
                                    </svg> : 
                                    todo.priority === 'high' ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#fadd00">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg> : 
                                    todo.priority === 'regular' ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="green">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg> : 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#1062FF">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                }
                                <h4 className="italic ml-1 text-xs mt-0.5">Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</h4>
                                </div>
                                <h1 className="w-full ml-1.5 truncate text-base font-medium">{todo.name.charAt(0).toUpperCase() + todo.name.slice(1)}</h1>
                                <p className="h-[65%] w-full text-sm mt-1 ml-1.5 font-normal leading-relaxed">{todo.description ? todo.description : 'No description'}</p>
                                <span className="flex items-center gap-1.5 absolute bottom-[15px] right-0.5 italic">{todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                                <p 
                                    className={`
                                    ${todo.status === 'done' ? 
                                    'h-4 w-4 bg-green-500' : 
                                    todo.status === 'left' ? 
                                    'h-4 w-4 bg-red-500' : 
                                    'h-4 w-4 bg-yellow-500'} 
                                    rounded-full`}>
                                </p>
                                </span>
                            </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <div className="absolute bottom-[5px] left-0 right-0 flex justify-center">
                <button title="Scroll left" onClick={() => slide(-150)} className="cursor-pointer mr-[50px]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <button title="Scroll right" onClick={() => slide(+150)} className="cursor-pointer ml-[50px]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
}