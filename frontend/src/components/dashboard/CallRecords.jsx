import { useEffect, useState } from "react";
import { FileClock, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import RefreshButton from "./RefreshButton";
import { useRecordsContext } from "../../context/RecordsContext";
import useFetchRecords from "../../hooks/useFetchRecords";
import useDeleteRecords from "../../hooks/useDeleteRecords";
import { useLoadingContext } from "../../context/LoadingContext.jsx";
export default function CallRecords() {
    const [pageNum, setPageNum] = useState(1);
    const [isNextPageDisabled, setIsNextPageDisabled] = useState(false);
    const { records, setRecords } = useRecordsContext();
    const { fetchRecords } = useFetchRecords();
    const { deleteRecords } = useDeleteRecords();
    const { setLoading } = useLoadingContext();
    // to handle pagination and refresh based on change in pageNum
    useEffect(() => {
        const helper = async () => {
            await fetchRecords(
                records,
                setRecords,
                pageNum,
                setIsNextPageDisabled,
                setLoading
            );
        };
        helper();
    }, [pageNum]);

    return (
        <div className="mb-6 bg-white p-4 rounded-xl shadow-md ">
            {/* Call Records Block */}
            <div className="flex items-center w-full gap-4 mb-6 ">
                {/* Title block */}
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <FileClock className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex-grow">
                    <p className="text-lg font-semibold">Your Call History</p>
                </div>
                {/* Refresh Records button */}
                <RefreshButton
                    refreshAction={async (e) => {
                        e.preventDefault();
                        await fetchRecords(
                            records,
                            setRecords,
                            pageNum,
                            setIsNextPageDisabled,
                            setLoading
                        );
                    }}
                />
                {/* Delete Records Button */}
                <div className="flex-shrink-0 content-center items-center justify-center gap-2 w-fit">
                    <div
                        className="bg-gradient-to-r  from-orange-400 to-pink-500 text-black p-2 rounded-lg 
                            hover:opacity-90 transition-opacity hover:underline hover:scale-110 hover:cursor-pointer
                            flex items-center gap-2 justify-center
                            "
                        onClick={async (e) => {
                            e.preventDefault();
                            await deleteRecords(
                                setPageNum,
                                setRecords,
                                setIsNextPageDisabled,
                                setLoading
                            );
                        }}
                    >
                        <Trash2 /> Delete
                    </div>
                </div>
            </div>
            {/* Records Table */}
            <pre className="overflow-y-auto rounded-md bg-orange-100">
                <table className="min-w-full table-auto border-collapse max-w-screen ">
                    <thead>
                        <tr
                            className="bg-gradient-to-r from-orange-300 to-pink-300 
                    text-black text-lg font-semibold text-left p-2 rounded-lg "
                        >
                            <th className="px-4 py-2 border">Time</th>
                            <th className="px-4 py-2 border">Method</th>
                            <th className="px-4 py-2 border">Endpoint</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Request Body</th>
                            <th className="px-4 py-2 border">Response Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map every record in record state*/}
                        {records.map((recordData) => {
                            return (
                                <Record
                                    key={recordData.time} // to make sure each component renders
                                    time={recordData.time}
                                    method={recordData.method}
                                    endpoint={recordData.endpoint}
                                    statusCode={recordData.statusCode}
                                    requestBody={recordData.requestBody}
                                    responseBody={recordData.responseBody}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </pre>
            {/* Pagination */}
            <Pagination
                pageNum={pageNum}
                isNextPageDisabled={isNextPageDisabled}
                goToPreviousPage={async (e) => {
                    e.preventDefault();
                    if (pageNum == 1) {
                        return;
                    }
                    setPageNum(pageNum - 1);
                }}
                goToNextPage={async (e) => {
                    e.preventDefault();
                    if (isNextPageDisabled) {
                        return;
                    }
                    setPageNum(pageNum + 1);
                }}
            />
        </div>
    );
}

function Record({
    time,
    method,
    endpoint,
    statusCode,
    requestBody,
    responseBody,
}) {
    return (
        <tr className="p-1 border-b hover:bg-orange-200 rounded-md">
            <td className="px-4 py-2 border text-md text-center">{time}</td>
            <td className="px-4 py-2 border text-md text-center">{method}</td>
            <td className="px-4 py-2 border text-md text-center">{endpoint}</td>
            <td className="px-4 py-2 border text-md text-center">
                {statusCode}
            </td>
            <td className="px-4 py-2 border text-md">{requestBody}</td>
            <td className="px-4 py-2 border text-md">
                {JSON.stringify(responseBody)}
            </td>
        </tr>
    );
}

function Pagination({
    pageNum,
    goToNextPage,
    goToPreviousPage,
    isNextPageDisabled,
}) {
    return (
        <div className=" flex gap-1 items-center justify-center m-2 p-2 text-center">
            <button
                className={`rounded-md p-2 w-10 
                    ${
                        pageNum == 1
                            ? "bg-gray-200 hover:cursor-not-allowed"
                            : "bg-orange-200 hover:bg-orange-300 hover:scale-105 hover:cursor-pointer"
                    }
                 `}
                onClick={goToPreviousPage}
            >
                <ChevronLeft />
            </button>
            <div className="bg-orange-300 rounded-md p-2 w-10">{pageNum}</div>
            <button
                className={`rounded-md p-2 w-10 
                    ${
                        isNextPageDisabled
                            ? "bg-gray-200 hover:cursor-not-allowed"
                            : "bg-orange-200 hover:bg-orange-300 hover:scale-105 hover:cursor-pointer"
                    }
                 `}
                onClick={goToNextPage}
            >
                <ChevronRight />
            </button>
        </div>
    );
}
