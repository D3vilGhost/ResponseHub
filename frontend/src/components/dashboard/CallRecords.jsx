import React from 'react'
import Record from './Record';
export default function CallRecords() {
    return (
        <div className="overflow-y-auto">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gradient-to-r from-orange-400 to-pink-500 
                    text-black text-lg font-semibold text-left
                     p-2 rounded-lg ">
                        <th className="px-4 py-2">Time</th>
                        <th className="px-4 py-2">Request Method</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Request Body</th>
                        <th className="px-4 py-2">Response Body</th>
                    </tr>
                </thead>
                <tbody>
                    <Record key={1} />
                    <Record key={2} />
                    <Record key={3} />
                    <Record key={4} />

                </tbody>
            </table>
        </div>

    );
}
