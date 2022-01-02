import React, {createContext, useEffect, useReducer} from 'react';
import {loadInitialItems, reducer} from "./AppReducer";

const AppContext = createContext()

function AppContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, {loading:true, errorCode:"", items:[]});

    useEffect(() => {
        loadInitialItems(dispatch)
    }, []);

    return <AppContext.Provider value={[state, dispatch]} {...props}/>;
}

export {
    AppContextProvider,
    AppContext
};
