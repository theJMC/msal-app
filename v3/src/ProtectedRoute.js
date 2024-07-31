import { Navigate, useLocation } from "react-router-dom"
import { useGlobalState } from "./globalState"
import { supabase } from './supabaseClient'
import { useEffect, useState } from "react"

export function RequireAuth({ children }) { 
    const [globalState, ] = useGlobalState()
    const [isAuth, setIsAuth] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const checkAuth = async () => { 
            setLoaded(false)
            try {
                const { data: { user }, error } = await supabase.auth.getUser() 
                
                if (error !== null) {
                    console.log("ERROR: ", error)
                    setIsAuth(false)
                } else if (user.id === JSON.parse(globalState.session).user.id) {
                    console.log("Returned True")
                    setIsAuth(true)
                } else {
                    console.log("General Error")
                    setIsAuth(false)
                }
            } catch {
                setIsAuth(false)
            } finally {
                setLoaded(true)
            }
            
        }
        checkAuth()
    }, [location.pathname, globalState.session])

    if (!loaded) {
        return null; // render spinner
    }
    
    if (!isAuth) {
        // Redirect if not authed
        return <Navigate to="/login" replace />
    }

    return children

}