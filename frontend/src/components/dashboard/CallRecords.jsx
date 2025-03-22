import React, { useState } from 'react'
import Record from './Record';
import { FileClock, Trash2 } from 'lucide-react';
import Pagination from "./Pagination"
export default function CallRecords({
    onClearRecords
}) {
    const [recordsPageNumber, setRecordsPageNumber] = useState(1);
    return (

        <div className='mb-6 bg-white p-4 rounded-xl shadow-md '>
            {/* Call Records Header */}
            <div className="flex items-center w-full gap-4 mb-6 ">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <FileClock className="h-6 w-6 text-orange-500" />
                </div>
                <div className='flex-grow'>
                    <p className="text-lg font-semibold">Your Call History</p>
                </div>
                <div
                    className="flex-shrink-0 content-center items-center justify-center gap-2 w-fit"
                >
                    <div className='bg-gradient-to-r from-red-300 to-red-500 text-black p-2 rounded-lg 
                            hover:opacity-90 transition-opacity hover:underline hover:scale-110 hover:cursor-pointer
                            flex items-center gap-2 justify-center
                            '
                        onClick={onClearRecords}>
                        <Trash2 /> Clear
                    </div>
                </div>
            </div>
            {/* Records Table */}
            <pre className="overflow-y-auto rounded-md bg-orange-100">
                <table className="min-w-full table-auto border-collapse max-w-screen ">
                    <thead>
                        <tr className="bg-gradient-to-r from-orange-300 to-pink-300 
                    text-black text-lg font-semibold text-left p-2 rounded-lg ">
                            <th className="px-4 py-2 border">Time</th>
                            <th className="px-4 py-2 border">Method</th>
                            <th className="px-4 py-2 border">Endpoint</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Request Body</th>
                            <th className="px-4 py-2 border">Response Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Record key={1} />
                        <Record key={2} />
                        <Record key={3} />
                        <Record key={4} />
                    </tbody>
                </table>
            </pre>
            <Pagination
                recordsPageNumber={recordsPageNumber}
                goToPreviousPage={() => {
                    if (recordsPageNumber != 1) {
                        setRecordsPageNumber(recordsPageNumber - 1);
                    }
                }}
                goToNextPage={() => {
                    setRecordsPageNumber(recordsPageNumber + 1);
                }}
            />
        </div>

    );
}
