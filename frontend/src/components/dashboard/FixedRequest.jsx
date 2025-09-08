import { FilePlus2, GitPullRequestCreateArrow } from "lucide-react";
import { useEffect, useState } from "react";
import RefreshButton from "./RefreshButton";

import { useLoadingContext } from "../../context/LoadingContext";
import { useFixedRequestsContext } from "../../context/FixedRequestsContext";

import useFetchFixedRequest from "../../hooks/useFetchFixedRequest";
import CreateFixedRequest from "./CreateFixedRequest";
import EditFixedRequest from "./EditFixedRequest";
import FixedRequestTile from "./FixedRequestTile";

// whenever the button is clicked, it set all the other open menus to false and only open the required one
// thus you will see multiple state update at button click event

export default function FixedRequest() {
    // context variables
    const { setLoading } = useLoadingContext();
    const { fixedRequestList, setFixedRequestList } = useFixedRequestsContext();

    // state variables to handle visibility of different components
    const [showCreateRequest, setShowCreateRequest] = useState(false);
    const [showEditRequest, setShowEditRequest] = useState(false);
    // below will be usefull in handling edit forms
    const [editRequestData, setEditRequestData] = useState({
        method: "",
        endpoint: "",
        statusCode: 0,
        responseBody: "",
    });
    const [refreshToken, setRefreshToken] = useState(0); // used to update list of user's fixed endpoints
    // use of hooks to consume fetch user fixed request list
    const { fetchFixedRequest } = useFetchFixedRequest();
    // FixedRequest component main code
    useEffect(() => {
        // this useEffect fetches the users list and update them
        const requestListRefreshHandler = async () => {
            const newList = await fetchFixedRequest(setLoading);
            setFixedRequestList([...newList]);
        };
        requestListRefreshHandler();
    }, [refreshToken]);
    return (
        <>
            <div className="mb-6 bg-white p-4 rounded-xl shadow-md ">
                {/* Header */}
                <div className="flex items-center w-full gap-4 mb-6 ">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <GitPullRequestCreateArrow className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-lg font-semibold">
                            Your Fixed API Endpoints
                        </p>
                    </div>
                    {/* Refresh button to refresh user's fixed Request */}
                    <RefreshButton
                        refreshAction={async (e) => {
                            e.preventDefault();
                            setRefreshToken((prev) => prev + 1);
                        }}
                    />
                    {/* Create new Fixed Endpoint Button */}
                    <div className="flex-shrink-0 content-center items-center justify-center gap-2 w-fit">
                        <button
                            className="bg-gradient-to-r  from-orange-400 to-pink-500 text-black p-2 rounded-lg 
                            hover:opacity-90 transition-opacity hover:underline hover:scale-110 hover:cursor-pointer
                            flex items-center gap-2 justify-center
                            "
                            onClick={(e) => {
                                e.preventDefault();
                                setShowCreateRequest(true);
                                setShowEditRequest(false);
                            }}
                        >
                            <FilePlus2 /> Create
                        </button>
                    </div>
                </div>

                {/* Available APIS */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-2 z-0"
                    id="fixed-requests-Container"
                >
                    {/* Map all items in fixedRequestsList to FixedRequestTile */}
                    {fixedRequestList?.map((fixedRequestData) => {
                        return (
                            <FixedRequestTile
                                key={
                                    fixedRequestData.method +
                                    fixedRequestData.endpoint +
                                    fixedRequestData.statusCode +
                                    fixedRequestData.responseBody
                                } // if key doesn't change then react doesn't re render
                                data={fixedRequestData}
                                setShowEditRequest={setShowEditRequest}
                                setShowCreateRequest={setShowCreateRequest}
                                setEditRequestData={setEditRequestData}
                                setRefreshToken={setRefreshToken}
                            />
                        ); // mayneed to add key here as well
                    })}
                </div>
            </div>
            {/* Create New Request Form  */}
            {showCreateRequest && (
                <CreateFixedRequest
                    editRequestData={editRequestData}
                    setEditRequestData={setEditRequestData}
                    setShowCreateRequest={setShowCreateRequest}
                    setRefreshToken={setRefreshToken}
                />
            )}

            {/* Edit Fixed Request form */}
            {showEditRequest && (
                <EditFixedRequest
                    editRequestData={editRequestData}
                    setEditRequestData={setEditRequestData}
                    setShowEditRequest={setShowEditRequest}
                    setRefreshToken={setRefreshToken}
                />
            )}
        </>
    );
}
