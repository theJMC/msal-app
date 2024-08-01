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
    const [globalState, setGlobalState] = useState(localStorage.getItem("globalState") ? JSON.parse(localStorage.getItem("globalState")) : defaults)

    useEffect(() => {
        localStorage.setItem("globalState", JSON.stringify(globalState))
    }, [globalState])

    useEffect(() => {
        const stateElements = JSON.parse(localStorage.getItem("globalState"));
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