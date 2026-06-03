import { AuthContext } from '@/Context/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const { token } = useContext(AuthContext)
    return (!token ? <Navigate to="/login" /> : children)

}
