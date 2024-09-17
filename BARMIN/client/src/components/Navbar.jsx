import { NavLink } from "react-router-dom";

export default function Navbar() {
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
            <NavLink
                to = "/login"
                end
            >
                로그인
            </NavLink>
            <NavLink
                to = "/register"
                end
            >
                회원가입
            </NavLink>
            <NavLink
                to = "/profile"
            >
                프로필
            </NavLink>
        </nav>    
    )
}