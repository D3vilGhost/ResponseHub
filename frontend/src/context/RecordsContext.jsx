import { createContext, useContext, useState } from "react";

// create a context global state
export const RecordsContext = createContext();

// create a provider component
export const RecordsContextProvider = ({ children }) => {
    const [records, setRecords] = useState([]);

    return (
        <RecordsContext.Provider value={{ records, setRecords }}>
            {children}
        </RecordsContext.Provider>
    );
};

// custom hook to consume
export const useRecordsContext = () => {
    return useContext(RecordsContext);
};
