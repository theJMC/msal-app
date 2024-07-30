import { supabase } from './supabaseClient'

export function checkIsAuth(globalState) {
    /* True if Authn'ed  */
    if (globalState.session === undefined || globalState.session === null) {
        // If Global State Session is not instantiated
        return false
    } else if (Object.keys(globalState.session).length === 0) {
        // If Global State Session is an empty object
        return false
    } else { 
        return true
    }
}

export function auth(globalState) {
    if (!checkIsAuth(globalState)) {
        return false
    } 

    
    supabase.auth.getUser().then(result => {
        const { data: { user }, error } = result
        if (error !== null) {
            console.error("ERROR: ", error)
            return false
        }
        if (user.id === JSON.parse(globalState.session).user.id) {
            return true
        } else {
            return false
        }
    })

    return null
}
