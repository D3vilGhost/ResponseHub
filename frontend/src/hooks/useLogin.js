import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router";

function useLogin() {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const login = async (loginCredentials) => {
        // check for errors
        const success = handleInputErrors(
            loginCredentials.username,
            loginCredentials.password
        );
        if (!success) return;
        // create a loading toast
        const loading = toast.loading("Processing...");

        try {
            const res = await fetch("/api/server/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginCredentials),
            });
            // data contains apiKey object and username
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(`Welcome ${data.name} !`);
            setAuthUser({ apiKey: data.apiKey });
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message);
        } finally {
            toast.remove(loading);
        }
    };

    return { login };
}
export default useLogin;

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    if (username.includes(" ")) {
        toast.error("Username cannot have space in it!");
        return false;
    }

    return true;
}
