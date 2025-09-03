import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router";

function useSignup() {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const signup = async ({ name, username, password }) => {
        // check for input constraints
        const success = handleInputErrors({
            name,
            username,
            password,
        });

        if (!success) return;

        let loading = toast.loading("Processing...");

        try {
            const res = await fetch("/api/server/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: { name, username, password },
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("user", JSON.stringify(data));
            setAuthUser(data);
            toast.success(`Welcome ${fullName} !`);
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message);
        } finally {
            toast.remove(loading);
        }
    };

    return { signup };
}
export default useSignup;

function handleInputErrors({ name, username, password }) {
    if (!name || !username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (username.includes(" ")) {
        toast.error("Username cannot have space in it!");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
