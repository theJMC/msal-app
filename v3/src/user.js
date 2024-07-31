
export function getEmail(globalState) {
    /* Get the email of the current user */
    return (globalState.session === undefined || Object.keys(globalState.session).length === 0) ? "ERROR" : JSON.parse(globalState.session).user.email
}


