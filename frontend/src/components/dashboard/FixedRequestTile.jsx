import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import { useLoadingContext } from "../../context/LoadingContext";
import useDeleteFixedRequest from "../../hooks/useDeleteFixedRequest";
import { useState } from "react";

export default function FixedRequestTile({
    data,
    setShowEditRequest,
    setShowCreateRequest,
    setEditRequestData,
    setRefreshToken,
}) {
    const { setLoading } = useLoadingContext();
    const { deleteFixedRequest } = useDeleteFixedRequest();
    const [showChangeMenu, setShowChangeMenu] = useState(false);
    const editAction = (e) => {
        e.preventDefault();
        setShowChangeMenu(false);
        setShowCreateRequest(false);
        setEditRequestData(data); // set this.data to be used in edit form
        setShowEditRequest(true);
    };

    const deleteAction = async (e) => {
        e.preventDefault();
        setShowChangeMenu(false);
        await deleteFixedRequest(
            data.method,
            data.endpoint,
            setLoading,
            setRefreshToken
        );
        // after delete action we dont need to do another request
        //  just remove this one from recordsList context thus passed setFixedRequestList
    };
    return (
        <div>
            <div className="from-orange-300 to-pink-300 bg-gradient-to-r rounded-lg shadow-md p-4 relative">
                <div className="absolute top-4 right-4">
                    <button
                        onClick={() => setShowChangeMenu(!showChangeMenu)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {showChangeMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-1">
                            <button
                                onClick={editAction}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button
                                onClick={deleteAction}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-lg  font-bold capitalize">
                    {data.method} - {data.statusCode}
                </p>
                <div className="text-sm font-semibold mb-2 text-gray-900 overflow-x-auto py-2">
                    /api/client/fixed{data.endpoint}
                </div>
                <div className="text-gray-700 bg-orange-100 p-2 rounded-md ">
                    <pretty-json expand={0}>
                        {JSON.stringify(JSON.parse(data.responseBody))}
                    </pretty-json>
                </div>
            </div>
        </div>
    );
}
