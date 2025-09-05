import { createContext, useContext, useState } from "react";
// create a context global state
export const AuthContext = createContext();

// create a contextProvider which will wrap the app and will provide it globally
// auth user contains the apiKey object
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

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
