import { useContext } from "react"
import { AuthContext } from "./../contexts/auth.context"
import { Navigate, Outlet } from 'react-router-dom'
import Loader from "../components/Loader/Loader"
//import Loader from "../components/Loader/Loader"

const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader md={{ offset: 3, span: 6 }} />

    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default PrivateRoute