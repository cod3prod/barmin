import { NavLink } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="sticky top-0 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink className="text-xl font-bold" to="/">
          BARMIN
        </NavLink>
        <button className="lg:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
        <div className="hidden lg:flex space-x-4">
          <NavLink to="/locations" end>
            BARS
          </NavLink>
          <NavLink to="/locations/new">NEW BARS</NavLink>
        </div>
      </div>
    </nav>
  );
}
