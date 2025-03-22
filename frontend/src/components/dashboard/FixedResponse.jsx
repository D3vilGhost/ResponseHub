import { MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
export default function FixedResponse({
    data,
    onEdit,
    onDelete
}) {

    const [showChangeMenu, setShowChangeMenu] = useState(false);
    // using data as state in case user decides to update it
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
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <button
                                onClick={
                                    () => {
                                        setShowChangeMenu(false);
                                        onEdit(data)
                                    }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button
                                onClick={
                                    () => {
                                        setShowChangeMenu(false);
                                        onDelete(data)
                                    }
                                }
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-lg  font-bold capitalize">{data.method}</p>
                <div className="text-sm font-semibold mb-2 text-gray-900 overflow-x-auto py-2">/api/client/fixed/{data.endpoint}</div>
                <pre className="text-gray-700 bg-orange-100 p-2 rounded-md ">{`${data.response}`}</pre>
            </div>
        </div>
    );
}