import { Link } from 'react-router-dom'
import './../styles/reusable/ViewProfileHome.css'

export default function ViewProfileHome({ show }) {
  const id = localStorage.getItem("id");
  const lastName = localStorage.getItem("lastName");
  const name = localStorage.getItem("name");
  const picture = localStorage.getItem("picture");

  //ashee
  if (id && lastName && name && picture) {
    return (
      <div className="flex flex-row items-center justify-end m-auto mr-[15px]">
        <Link
          to={`/guard/${id}/profile`}
          className="flex flex-row items-center justify-end m-auto mr-[15px]"
        >
          <h4 className="text-lg font-extrabold font-['nunito'] ml-2">
            <span className={`${show ? "text-[#ff5cf4]" : "text-[#0023c4]"}`}>
              {name.charAt(0).toUpperCase()}
            </span>
            <span>{name.slice(1)}</span>
            <span className="pl-1">
              {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
            </span>
          </h4>
          {picture === undefined ? (
            <img
              title="Profile"
              src={picture}
              alt="Not found"
              className="rounded-full w-[35px] h-[35px]"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[35px] h-[35px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#2340be"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </Link>
      </div>
    );
  }
}
