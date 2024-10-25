import { NavLink, useLocation } from "react-router-dom";

export default function MenuLink({ to, children, end = false }) {
  const location = useLocation();

  const isActive =
    (end && location.pathname === to) ||
    (!end &&
      location.pathname.startsWith(to) &&
      !location.pathname.includes("/new"));

  return (
    <NavLink
      to={to}
      end={end}
      className={`box-border w-20 h-full flex justify-center items-center mr-auto font-bold border-t-4 border-b-4 border-transparent ${
        isActive
          ? "text-blue-500 border-b-blue-500"
          : "text-white hover:border-b-white"
      }`}
    >
      {children}
    </NavLink>
  );
}
