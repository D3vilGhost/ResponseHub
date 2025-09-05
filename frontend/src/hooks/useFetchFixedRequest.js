import toast from "react-hot-toast";

export default function useFetchFixedRequest() {
    const fetchFixedRequest = async (setLoading) => {
        // no need to have any dat as we just need the jwt token
        setLoading(true);
        try {
            const res = await fetch("/api/server/dashboard/fixed"); // GET request

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data; // data will be an array of objects
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { fetchFixedRequest };
}
