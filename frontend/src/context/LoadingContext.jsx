import { createContext, useContext, useState } from "react";
// create a context global state
export const LoadingContext = createContext();

// create a contextProvider which will wrap the app and will provide it globally
export const LoadingContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// custom hook to consue the authentication context
export const useLoadingContext = () => {
    return useContext(LoadingContext);
};
