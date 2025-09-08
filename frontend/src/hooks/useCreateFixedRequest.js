import toast from "react-hot-toast";

export default function useCreateFixedRequest() {
    const createFixedRequest = async (
        setLoading,
        editRequestData,
        setRefreshToken
    ) => {
        setLoading(true);
        try {
            ///before updation check for responseBody proper format in json
            if (!isValidJSON(editRequestData.responseBody)) {
                throw new Error("Response Body is not proper JSON.");
            }
            if (!isValidStatusCode(editRequestData.statusCode)) {
                throw new Error(
                    "Status Code value not allowed. Check Overview to know about allowed status codes."
                );
            }
            if (editRequestData.method == "-") {
                throw new Error("Please select HTTP method");
            }
            // then continue with the api
            const res = await fetch("/api/server/dashboard/fixed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editRequestData),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(data.message);
            // update refreshToken
            setRefreshToken((prev) => prev + 1);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { createFixedRequest };
}

function isValidJSON(responseBody) {
    try {
        JSON.parse(responseBody);
        return true;
    } catch (error) {
        return false;
    }
}
function isValidStatusCode(statusCode) {
    const allowed = new Set([
        100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
        300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404,
        405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
        421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503,
        504, 505, 506, 507, 508, 510, 511,
    ]);
    return allowed.has(parseInt(statusCode));
}
