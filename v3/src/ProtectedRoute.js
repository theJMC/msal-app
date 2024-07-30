import { Navigate } from "react-router-dom"
import { useGlobalState } from "./globalState"
import { auth } from "./auth"

export function RequireAuth({ children }) { 
    const [globalState, ] = useGlobalState()

    return auth(globalState) ? children : <Navigate to="/login" replace />
}