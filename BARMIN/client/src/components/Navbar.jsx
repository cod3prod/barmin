import { NavLink } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav>
            <NavLink
                to = "/"
                end
            >
                홈
            </NavLink>
            <NavLink
                to = "/locations"
            >
                장소 목록
            </NavLink>
            {isLoggedIn ? (
                <button onClick={logout}>로그아웃</button>
            ) : (
                <>
                <NavLink to="/login" end>
                    로그인
                </NavLink>
                <NavLink to="/register" end>
                    회원가입
                </NavLink>
                </>
            )}
            <NavLink
                to = "/profile"
            >
                프로필
            </NavLink>
        </nav>    
    )
}