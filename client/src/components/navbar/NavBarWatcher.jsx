import React from "react";
import { Link } from 'react-router-dom';

export default function NavBarWatcher ({userData, show}) {
    return (
        <>
            {
                userData ? 
                <li className="flex flex-col items-center gap-1 font-['nunito'] translate-x-[10px]">
                    <Link className="flex w-full my-2" to={`/guard/${userData}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#0023c4">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
                            <p className={`${show ? '' : 'opacity-0 ease-in-out transition duration-1000'}`}>Dashboard</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/guard/${userData}/profile`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#0023c4">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
                            <p className={`${show ? '' : 'opacity-0 ease-in-out transition duration-1000'}`}>Profile</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/guard/${userData}/tasks`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#0023c4">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
                            <p className={`${show ? '' : 'opacity-0 ease-in-out transition duration-1000'}`}>Tasks</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/guard/${userData}/reports/sender`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#0023c4">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
                            <p className={`${show ? '' : 'opacity-0 ease-in-out transition duration-1000'}`}>Your reports</p>
                        </button>
                    </Link>
                </li>
                : null
            }
        </>
    )

}