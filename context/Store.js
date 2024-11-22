import React, { createContext, useReducer } from "react";
import reducers from "./Reducer";

const initialState = {
    userData: {
        isVerified: false,
        access: "",
        refresh: "",
    },
    userDetails: {
        name: '',
        user_name: '',
        photo: '',
    }
};

export const Context = createContext(initialState);

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducers, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export default Store;

