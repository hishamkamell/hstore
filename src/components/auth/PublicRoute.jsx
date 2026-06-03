import { AuthContext } from "@/Context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"


export default function PublicRoute({ children }) {
    const { token } = useContext(AuthContext)
    return (token ? <Navigate to="/" /> : children)
}
