import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      // localStorage에서 JWT 확인
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, []);
  
    const login = (token) => {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  // Context를 사용하는 훅
  export const useAuth = () => useContext(AuthContext);