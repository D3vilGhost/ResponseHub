import { createContext, useContext, useState } from "react";

// 1. Create the context
const FixedRequestsContext = createContext();

// 2. Create a provider component
export const FixedRequestsContextProvider = ({ children }) => {
    const [fixedRequestList, setFixedRequestList] = useState([]);

    return (
        <FixedRequestsContext.Provider
            value={{ fixedRequestList, setFixedRequestList }}
        >
            {children}
        </FixedRequestsContext.Provider>
    );
};

// 3. Create a custom hook for consuming
export const useFixedRequestsContext = () => {
    return useContext(FixedRequestsContext);
};
