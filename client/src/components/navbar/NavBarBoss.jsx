import { Link } from "react-router-dom";

export default function NavBarBoss({ userData, show, setShow }) {
  return (
    <>
      {userData ? (
        <li className="flex flex-col items-center gap-1 font-['nunito']">
          <Link className="flex w-full my-2" to={`/boss/${userData}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#0023c4"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
              <p
                className={`${
                  show ? "" : "opacity-0 ease-in-out transition duration-1000"
                }`}
              >
                Dashboard
              </p>
            </button>
          </Link>
          <Link className="flex w-full my-2" to={`/boss/${userData}/profile`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#0023c4"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
              <p
                className={`${
                  show ? "" : "opacity-0 ease-in-out transition duration-1000"
                }`}
              >
                Profile
              </p>
            </button>
          </Link>
          <Link className="flex w-full my-2" to={`/boss/${userData}/employees`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#0023c4"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
              <p
                className={`${
                  show ? "" : "opacity-0 ease-in-out transition duration-1000"
                }`}
              >
                Employees
              </p>
            </button>
          </Link>
          <Link className="flex w-full my-2" to={`/boss/${userData}/add`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#0023c4"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
              <p
                className={`${
                  show ? "" : "opacity-0 ease-in-out transition duration-1000"
                }`}
              >
                Add employees
              </p>
            </button>
          </Link>
          <Link
            className="flex w-full my-2"
            to={`/boss/${userData}/environment`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#0023c4"
            >
              <path
                fillRule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clipRule="evenodd"
              />
            </svg>
            <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
              <p
                className={`${
                  show ? "" : "opacity-0 ease-in-out transition duration-1000"
                }`}
              >
                Environments
              </p>
            </button>
          </Link>
          <Link
            className="flex w-full my-2"
            to={`/boss/${userData}/reports/receiver`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#0023c4"
            >
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
            </svg>
            <button className="focus:text-black hover:text-black cursor-pointer focus:outline-none font-extrabold text-[#cbcfdd] ml-1">
              <p
                className={`${
                  show ? "" : "opacity-0 ease-in-out transition duration-1000"
                }`}
              >
                Received reports
              </p>
            </button>
          </Link>
        </li>
      ) : null}
    </>
  );
}
