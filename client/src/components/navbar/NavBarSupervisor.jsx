import React from "react";
import { Link } from 'react-router-dom'

export default function NavBarSupervisor ({userData, show}) {
    return (
        // <>
        //     {
        //         userData
        //         ? <li className="flex items-center gap-2.5">
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}`}>
        //                 Dashboard
        //             </Link>
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}/profile`}>
        //                 Profile
        //             </Link>
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}/employees`}>
        //                 Employees
        //             </Link>
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}/add`}>
        //                 Add Employees
        //             </Link>
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}/tasks`}>
        //                 See Tasks
        //             </Link>
        //             <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/prueba/supervisor/${userData}`}>
        //                 PRUEBA
        //             </Link>
        //         </li>
        //         : null
        //     }
        // </>
        <>
            {
                userData ? 
                <li className='flex flex-col items-center gap-1'>
                    <Link className="flex w-full my-2" to={`/supervisor/${userData}`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Dashboard</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/supervisor/${userData}/profile`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Profile</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/supervisor/${userData}/employees`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Employees</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/supervisor/${userData}/add`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Add employees</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/supervisor/${userData}/tasks`}>
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
                    <Link className="flex w-full my-2" to={`/prueba/supervisor/${userData}`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                              <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Testing</p>
                        </button>
                    </Link>
                </li>
                : null
            }
        </>
    )

}