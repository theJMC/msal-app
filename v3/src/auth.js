

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
