import { createContext, useContext, useState } from "react";

// create a context global state
export const AuthContext = createContext();

// custom hook to consue the authentication context
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// create a contextProvider which will wrap the app and will provide it globally
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
