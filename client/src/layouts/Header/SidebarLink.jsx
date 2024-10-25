import { NavLink, useLocation } from "react-router-dom";

export default function SidebarLink({ to, children, onClick, end = false }) {
  const location = useLocation();

  const isActive =
    (end && location.pathname === to) ||
    (!end &&
      location.pathname.startsWith(to) &&
      !location.pathname.includes("/new"));

  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={`text-white ${
          isActive ? "text-yellow-400 font-bold" : "hover:text-gray-300"
        }`}
        onClick={onClick}
      >
        {children}
      </NavLink>
    </li>
  );
}
