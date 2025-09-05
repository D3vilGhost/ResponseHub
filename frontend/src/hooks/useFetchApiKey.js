import toast from "react-hot-toast";

export default function useFetchApiKey() {
    const fetchApiKey = async (setLoading) => {
        setLoading(true);
        try {
            // will fetch apiKey based on jwt token
            const apiKeyObjectResponse = fetch("/api/server/auth/key");
            if (apiKeyObject.error) {
                throw new Error(apiKeyObject.error);
            }
            const apiKeyObject = await apiKeyObjectResponse.json();
            return apiKeyObject;
        } catch (error) {
            // won't do anything with error
            toast.error(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { fetchApiKey };
}
