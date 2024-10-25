import { NavLink, Link, Form } from "react-router-dom";
import { authStore } from "../../zustand/AuthStore";
import { FiMenu, FiX, FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";

export default function SmallMenu({ isMenuOpen, toggleMenu}) {
  const { username } = authStore();

  return (
    <nav className="bg-black text-white lg:hidden">
      <div className="h-16 w-full px-4 flex justify-between">
        <Link to="/">
          <div className="h-full w-16 flex justify-center items-center">
            <span className="font-bold">BARMIN</span>
          </div>
        </Link>
        <div className="h-full flex justify-between items-center">
          {/* 로그아웃 / 로그인 + 회원가입 */}
          <div className="mr-10 flex gap-4 translate-y-0.5">
            {username ? (
              <Form method="post" action="/">
                <button type="submit">
                  <FiLogOut size={30} />
                </button>
              </Form>
            ) : (
              <>
                <NavLink to="/login">
                  <FiLogIn size={30} className="cursor-pointer" />
                </NavLink>
                <NavLink to="/register">
                  <FiUserPlus size={30} className="cursor-pointer" />
                </NavLink>
              </>
            )}
          </div>
          {/* 메뉴 버튼 */}
          {isMenuOpen ? (
            <FiX size={30} className="cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FiMenu size={30} className="cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
      </div>
      {/* 사이드 바 */}
      <div
        className={`fixed top-0 left-0 z-20 w-64 h-full bg-black transition-transform duration-200 ${
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <p className="text-gray-400">{username}</p>

          {/* 메뉴 */}
          <ul className="mt-6 space-y-4">
            <li>
              <NavLink
                to="/"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/locations"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                MAP
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/locations/new"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                NEW
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                PROFILE
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* 백그라운드 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
}
