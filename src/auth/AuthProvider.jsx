import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({children}){
    const initialTokens = localStorage.getItem('tokens') || '{}';
    const [tokens, setTokens] = useState(JSON.parse(initialTokens));

    useEffect(() => {
        localStorage.setItem('tokens', JSON.stringify(tokens));
    }, [tokens]);

    const setToken = (mail, token) => {
        setTokens(prevTokens => ({
            ...prevTokens,
            [mail]: token
        }));
    }

    const getToken = (mail) => {
        return tokens[mail] || null;
    }

    const logout = (mail) => {
        setTokens(prevTokens => {
            const newTokens = {...prevTokens};
            delete newTokens[mail];
            return newTokens;
        });
    }

    return (
        <AuthContext.Provider value={{tokens, setToken, logout, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;