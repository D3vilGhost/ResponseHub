import { useState } from "react";
import { useLoadingContext } from "../../context/LoadingContext";
import useCreateFixedRequest from "../../hooks/useCreateFixedRequest";
import { Save } from "lucide-react";

export default function CreateFixedRequest({
    editRequestData,
    setEditRequestData,
    setShowCreateRequest,
    setRefreshToken,
}) {
    const { setLoading } = useLoadingContext();
    const { createFixedRequest } = useCreateFixedRequest();
    const cancelAction = (e) => {
        e.preventDefault();
        // set data  back to empty
        setEditRequestData({
            method: "",
            endpoint: "",
            statusCode: 0,
            responseBody: "",
        });
        // close the modal
        setShowCreateRequest(false);
    };
    const saveAction = async (e) => {
        e.preventDefault();
        await createFixedRequest(setLoading, editRequestData, setRefreshToken);
        setShowCreateRequest(false);
    };
    return (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center p-4 overflow-auto">
            <div className="from-orange-300 to-pink-300 bg-gradient-to-r rounded-lg p-6 w-full max-w-md border-1">
                <h2 className="text-2xl font-bold mb-4">
                    Create Fixed Response
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // just disable the form default submit nature
                    }}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium pb-2">
                                Endpoint
                            </label>
                            <input
                                type="text"
                                required
                                className="p-2 block w-full rounded-md  bg-orange-100 shadow-sm"
                                value={editRequestData.endpoint}
                                onChange={(e) =>
                                    setEditRequestData({
                                        ...editRequestData,
                                        endpoint: e.target.value,
                                    })
                                }
                                placeholder="/"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium pb-2">
                                Method
                            </label>
                            <select
                                className="p-2 block w-full rounded-md bg-orange-100 shadow-sm "
                                value={editRequestData.method}
                                onChange={(e) =>
                                    setEditRequestData({
                                        ...editRequestData,
                                        method: e.target.value,
                                    })
                                }
                            >
                                <option value="-">-</option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium pb-2">
                                Status Code
                            </label>
                            <input
                                type="number"
                                className="p-2 block w-full rounded-md  bg-orange-100 shadow-sm"
                                value={editRequestData.statusCode}
                                onChange={(e) =>
                                    setEditRequestData({
                                        ...editRequestData,
                                        statusCode: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium pb-2">
                                Response
                            </label>
                            <code>
                                <textarea
                                    required
                                    className="p-2 block w-full rounded-md  bg-orange-100 shadow-sm"
                                    rows={4}
                                    value={editRequestData.responseBody}
                                    onChange={(e) =>
                                        setEditRequestData({
                                            ...editRequestData,
                                            responseBody: e.target.value,
                                        })
                                    }
                                />
                            </code>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={cancelAction}
                            className="px-4 py-2 text-sm font-medium bg-neutral-100 rounded-md hover:bg-neutral-300 hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-4 py-2 text-sm font-medium text-black bg-gradient-to-r from-green-300 to-green-500 rounded-md hover:from-green-500 hover:to-green-700 hover:cursor-pointer"
                            onClick={saveAction}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
