import toast from "react-hot-toast";

export default function useDeleteFixedRequest() {
    const deleteFixedRequest = async (
        method,
        endpoint,
        setLoading,
        setRefreshToken
    ) => {
        // no need to have any data as we just need the jwt token
        setLoading(true);
        try {
            const res = await fetch(
                `/api/server/dashboard/fixed?method=${method}&endpoint=${endpoint}`,
                {
                    method: "DELETE",
                }
            ); // DELETE request

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(data.message); // data will be just an message
            // also update the fixedRequestList by removing this one
            setRefreshToken((prev) => prev + 1);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteFixedRequest };
}
