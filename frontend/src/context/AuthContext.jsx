import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
// create a context global state
export const AuthContext = createContext();

// create a contextProvider which will wrap the app and will provide it globally
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState({
        apiKey: "",
        username: "",
    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook to consue the authentication context
export const useAuthContext = () => {
    return useContext(AuthContext);
};
