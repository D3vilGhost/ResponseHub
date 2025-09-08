import { Routes, Route, Navigate } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ApiDocs from "./pages/ApiDocs";
import Dashboard from "./pages/Dashboard";
import Overview from "./components/documentation/Overview";
import FlexibleRequestFormat from "./components/documentation/FlexibleRequestFormat";
import ResponseFormat from "./components/documentation/ResponseFormat";
import Loader from "./components/Loader";
import { useAuthContext } from "./context/AuthContext.jsx";
import { useLoadingContext } from "./context/LoadingContext.jsx";
import { useEffect } from "react";
import useFetchApiKey from "./hooks/useFetchApiKey.js";

export default function App() {
    const { authUser, setAuthUser } = useAuthContext();
    const { loading, setLoading } = useLoadingContext();
    const { fetchApiKey } = useFetchApiKey();

    useEffect(() => {
        // this useEffect hook runs only once when page loads
        // and thus stores apiKey in memory ensuring security
        const apiKeyFetcher = async () => {
            await fetchApiKey(setLoading, setAuthUser);
        };
        apiKeyFetcher();
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />
            <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Login */}
                <Route
                    path="/login"
                    element={
                        authUser ? <Navigate to="/dashboard" /> : <Login />
                    }
                />

                {/* Signup */}
                <Route
                    path="/signup"
                    element={
                        authUser ? <Navigate to="/dashboard" /> : <Signup />
                    }
                />

                {/* Docs with nested routes */}
                <Route path="/docs" element={<ApiDocs />}>
                    <Route index element={<Overview />} />
                    <Route
                        path="request/flexible"
                        element={<FlexibleRequestFormat />}
                    />
                    <Route path="response" element={<ResponseFormat />} />
                </Route>

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        loading ? (
                            <Dashboard />
                        ) : authUser ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Catch-all (acts like errorElement) */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {loading && <Loader />}
        </div>
    );
}
