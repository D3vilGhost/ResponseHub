import CallRecords from "../components/dashboard/CallRecords";
import FixedRequest from "../components/dashboard/FixedRequest";
import ApiKey from "../components/dashboard/ApiKey";
import { RecordsContextProvider } from "../context/RecordsContext";
import { FixedRequestsContextProvider } from "../context/FixedRequestsContext";
import { useAuthContext } from "../context/AuthContext.jsx";
export default function Dashboard() {
    const { authUser } = useAuthContext();
    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header for Dashboard */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Dashboard
                </h1>
                <p className="text-gray-600 text-center mb-12">
                    Overview of API Call Activity and Performance Insights
                </p>
            </div>

            {/* Api Key part of dashboard */}
            <ApiKey API_KEY={authUser.apiKey} />

            {/* Fixed Responses part of dashboard */}
            <FixedRequestsContextProvider>
                <FixedRequest />
            </FixedRequestsContextProvider>

            {/* API Call's history */}
            <RecordsContextProvider>
                <CallRecords />
            </RecordsContextProvider>
        </div>
    );
}
