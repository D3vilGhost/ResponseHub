import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const useLogout = () => {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const logout = async () => {
        // create a loading toast
        let loading = toast.loading("Processing...");

        try {
            // no need to send any data as we just need to remove token
            const res = await fetch("/api/server/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            // just incase something happens
            if (data.error) {
                throw new Error(data.error);
            }

            setAuthUser(null);
            toast.success(data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        } finally {
            // finally remove the loading toast
            toast.remove(loading);
        }
    };

    return { logout };
};
export default useLogout;
