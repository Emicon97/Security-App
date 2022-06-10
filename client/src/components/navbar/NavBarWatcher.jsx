import React from "react";
import { Link } from 'react-router-dom';

export default function NavBarWatcher ({userData, show}) {
    return (
        // <>
        //     {
        //         userData
        //         ? <li className="flex items-center gap-2.5">
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/guard/${userData}`}>
        //                 Dashboard
        //             </Link>
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/guard/${userData}/profile`}>
        //                 Perfil
        //             </Link>
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/guard/${userData}/tasks`}>
        //                 Ver Tareas
        //             </Link>
        //         </li>
        //         : null
        //     }
        // </>
        <>
            {
                userData ? 
                <li className='flex flex-col items-center gap-1 ml-3'>
                    <Link className="flex w-full my-2" to={`/guard/${userData}`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Dashboard</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/guard/${userData}/profile`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Profile</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/guard/${userData}/tasks`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Tasks</p>
                        </button>
                    </Link>
                </li>
                : null
            }
        </>
    )

}