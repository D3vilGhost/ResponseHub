import React from 'react'

export default function Record
    ({ time = Date.now(),
        requestMethod = "GET",
        status = "Success",
        requestBody = "abc",
        responseBody = "abc"
    }) {
    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="px-4 py-2 text-sm text-gray-700">{time}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{requestMethod}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{status}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{requestBody}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{responseBody}</td>
        </tr>
    );
}
