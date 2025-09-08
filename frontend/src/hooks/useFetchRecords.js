import toast from "react-hot-toast";

export default function useFetchRecords() {
    const fetchRecords = async (
        records,
        setRecords,
        pageNum,
        setIsNextPageDisabled,
        setLoading
    ) => {
        setLoading(true);
        try {
            // no need to send any data as we just need to remove token
            const res = await fetch(
                `/api/server/dashboard/records?page=${pageNum}`
            ); //GET Request

            const data = await res.json();
            // just incase something happens
            if (data.error) {
                throw new Error(data.error);
            }
            setRecords(data);
            setIsNextPageDisabled(data.length < 10);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { fetchRecords };
}
