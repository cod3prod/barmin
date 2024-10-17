import {
  NavLink,
  Link,
  Form,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { FiMenu } from "react-icons/fi";

export default function LargeMenu({ toggleMenu, username }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    navigate("/");
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 300);
  };

  return (
    <nav className="hidden lg:block bg-black text-white">
      <div className="lg:h-28 w-full flex justify-start border-b border-[#333333]">
        <Link to="/">
          <div className="h-full w-36 flex items-center justify-center border-r border-[#333333]">
            <span className="text-2xl font-bold">BARMIN</span>
          </div>
        </Link>
        <div className="w-full flex flex-col">
          <div className="hidden h-1/3 px-8 py-2 lg:flex justify-end border-b border-[#333333]">
            <span
              className="text-sm text-slate-400 hover:text-white cursor-pointer"
              onClick={handleClick}
            >
              REFERENCE
            </span>
          </div>
          <div className="px-8 flex justify-between h-2/3 items-center">
            <button
              className="lg:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              <FiMenu size={30} />
            </button>
            <div className="h-full flex space-x-4">
              <NavLink
                className="box-border w-20 h-full flex justify-center items-center mr-auto font-bold border-t-4 border-b-4 border-transparent hover:border-b-white"
                to="/"
                end
              >
                HOME
              </NavLink>
              <NavLink
                className="box-border w-20 h-full flex justify-center items-center mr-auto font-bold border-t-4 border-b-4 border-transparent hover:border-b-white"
                to="/locations"
                end
              >
                MAP
              </NavLink>
              <NavLink
                className="box-border w-20 h-full flex justify-center items-center mr-auto font-bold border-t-4 border-b-4 border-transparent hover:border-b-white"
                to="/locations/new"
              >
                NEW
              </NavLink>
            </div>
            <div className="flex space-x-4 ml-auto">
              {!username ? (
                <>
                  <NavLink className="flex items-center font-bold" to="/login">
                    LOGIN
                  </NavLink>
                  <NavLink
                    className="flex items-center font-bold"
                    to="/register"
                  >
                    JOIN
                  </NavLink>
                </>
              ) : (
                <Form
                  className="flex items-center font-bold"
                  method="POST"
                  action="/"
                >
                  <button type="submit">LOGOUT</button>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
