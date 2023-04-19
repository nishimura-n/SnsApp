import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer"

//最初のユーザー状態を定義
const initialState = {
    user: JSON.parse(localStorage.getItem("token")) || null,
    isFetching: false,
    error: false,
}

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        localStorage.setItem("token",JSON.stringify(state.user));
    },[state.user]);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}