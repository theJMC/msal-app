import { useState, createContext, useContext, useEffect } from "react";

const GlobalContext = createContext(null);

const defaults = {
    "meta": {
        "title": "Aurora Inns",
    },
    "session": null
}

export const GlobalState = props => {
    // declare the GlobalState 
    const [globalState, setGlobalState] = useState(sessionStorage.getItem("globalState") ? JSON.parse(sessionStorage.getItem("globalState")) : defaults)

    useEffect(() => {
        sessionStorage.setItem("globalState", JSON.stringify(globalState))
    }, [globalState])

    useEffect(() => {
        const stateElements = JSON.parse(sessionStorage.getItem("globalState"));
        if (stateElements) {
            setGlobalState(stateElements);
        }
    }, [])

    // create a func to update one at a time
    const updateGlobalState = (key, newValue) => {
        setGlobalState(oldState => {
            if (oldState[key] !== newValue) {
                const newState = { ...oldState }
                newState[key] = newValue
                return newState
            } else {
                return oldState
            }
        })
    }

    return (
        <GlobalContext.Provider value={[globalState, updateGlobalState]}>{props.children}</GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext)