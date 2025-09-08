export default function useFetchApiKey() {
    const fetchApiKey = async (setLoading, setAuthUser) => {
        setLoading(true);
        try {
            // will fetch apiKey based on jwt token
            const apiKeyObjectResponse = await fetch(
                "/api/server/dashboard/key"
            );
            const apiKeyObject = await apiKeyObjectResponse.json();
            if (apiKeyObject?.error) {
                throw new Error(apiKeyObject.error);
            }
            setAuthUser(apiKeyObject);
        } catch (error) {
            // won't do anything with error
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    };
    return { fetchApiKey };
}
