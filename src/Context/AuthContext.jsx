import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



export const AuthContext = createContext()
export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const decoded = (token && jwtDecode(token) || null);
    const userId = decoded?.id
    const login = (usertoken) => {
        localStorage.setItem("token", usertoken);
        setToken(usertoken);
    }
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.href = "/login";
    }

    return (

        <AuthContext.Provider value={{ token, logout, login, userId }}>
            {children}
        </AuthContext.Provider>
    )
}


/* 
 */
