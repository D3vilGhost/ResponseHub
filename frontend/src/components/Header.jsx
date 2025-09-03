import { Link, useLocation } from "react-router";
import useLogout from "../hooks/useLogout";
export default function Header() {
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";
    const { logout } = useLogout();

    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold">
                    ResponseHub
                </Link>

                <div className="flex items-center space-x-4">
                    {isDashboard ? (
                        <>
                            <Link
                                to="/docs"
                                className="text-gray-600 hover:underline hover:text-black hover:scale-110"
                            >
                                Docs
                            </Link>
                            <button
                                className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity hover:underline hover:scale-110"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await logout();
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/docs"
                                className="text-gray-600 hover:underline hover:text-black hover:scale-110"
                            >
                                Docs
                            </Link>
                            <Link
                                to="/login"
                                className="text-gray-600 hover:underline hover:text-black hover:scale-110"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity hover:underline hover:scale-110"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
