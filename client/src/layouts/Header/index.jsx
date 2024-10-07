import { useState } from "react";
import { NavLink, Form } from "react-router-dom";
import { authStore } from "../../zustand/AuthStore";
import { FiMenu } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username } = authStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="sticky top-0 bg-gray-800 text-white">
        <div className="container mx-auto flex justify-between items-center p-4">
          <NavLink className="text-xl font-bold" to="/">
            BARMIN
          </NavLink>
          <button className="lg:hidden focus:outline-none" onClick={toggleMenu}>
            <FiMenu size={30} />
          </button>
          <div className="hidden lg:flex space-x-4">
            <NavLink to="/locations" end>
              리스트 보기
            </NavLink>
            <NavLink to="/locations/new">새로운 장소</NavLink>
            {!username ? (
              <>
                <NavLink to="/login">로그인</NavLink>
                <NavLink to="/register">가입</NavLink>
              </>
            ) : (
              <Form method="POST" action='/'>
                <button type="submit">
                  로그아웃
                </button>
              </Form>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 p-4">
            <NavLink onClick={toggleMenu} to="/locations" className="block py-2">
              리스트 보기
            </NavLink>
            <NavLink
              onClick={toggleMenu}
              to="/locations/new"
              className="block py-2"
            >
              새로운 장소
            </NavLink>

            {!username ? (
              <>
                <NavLink onClick={toggleMenu} to="/login" className="block py-2">
                  로그인
                </NavLink>
                <NavLink
                  onClick={toggleMenu}
                  to="/register"
                  className="block py-2"
                >
                  가입
                </NavLink>
              </>
            ) : (
              <Form method="POST" action='/' onSubmit={toggleMenu}>
                <button
                  type="submit"
                  className="block py-2"  
                >
                  로그아웃
                </button>
              </Form>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
