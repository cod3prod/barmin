import { useState } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../zustand/AuthStore";
import axios from "axios";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, setName } = authStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/logout");
      const result = response.data;
      if(!result.success){
        throw new Error("로그아웃 실패");
      }
      localStorage.removeItem('token');
      setName("");
    } catch (error) {
      console.error("POST 요청 오류:", error);
    }
  };

  return (
    <nav className="sticky top-0 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink className="text-xl font-bold" to="/">
          BARMIN
        </NavLink>
        <button className="lg:hidden focus:outline-none" onClick={toggleMenu}>
          <img src="/menu.svg" alt="Delete icon" className="h-6 w-6" />
        </button>
        <div className="hidden lg:flex space-x-4">
          <NavLink to="/locations" end>
            BARS
          </NavLink>
          <NavLink to="/locations/new">NEW BARS</NavLink>
          {!username ? (
            <>
              <NavLink to="/login">login</NavLink>
              <NavLink to="/register">register</NavLink>
            </>
          ) : (
            <NavLink to="locations">logout</NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800 p-4">
          <NavLink onClick={closeMenu} to="/locations" className="block py-2">
            BARS
          </NavLink>
          <NavLink onClick={closeMenu} to="/locations/new" className="block py-2">
            NEW BARS
          </NavLink>

          {!username ? (
            <>
              <NavLink onClick={closeMenu} to="/login" className="block py-2">
                login
              </NavLink>
              <NavLink onClick={closeMenu} to="/register" className="block py-2">
                register
              </NavLink>
            </>
          ) : (
            <NavLink onClick={(e)=>{
              handleClick(e);
              closeMenu();
              }} to="/locations" className="block py-2">
              logout
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
