import toast from "react-hot-toast";

export default function useDeleteRecords() {
    const deleteRecords = async (
        setPageNum,
        setRecords,
        setIsNextPageDisabled,
        setLoading
    ) => {
        setLoading(true);
        try {
            // no need to send any data as we just need to remove token
            const res = await fetch("/api/server/dashboard/records", {
                method: "DELETE",
            });

            const data = await res.json();
            // just incase something happens
            if (data.error) {
                throw new Error(data.error);
            }
            setPageNum(1);
            setRecords([]);
            setIsNextPageDisabled(true);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteRecords };
}
