import React from 'react'

export default function Record
    ({ time = Date.now(),
        method = "GET",
        endpoint = "/api/client/fixed/myapi1",
        status = "Success",
        requestBody = "{\n\ta:{\n\t\tb:'abc'\n\t}\n\tc:'abcdwergtwdefgdefgrdefe'\n}",
        responseBody = "abc"
    }) {
    return (
        <tr className="p-1 border-b hover:bg-orange-200 rounded-md">
            <td className="px-4 py-2 border text-md text-center">{time}</td>
            <td className="px-4 py-2 border text-md text-center">{method}</td>
            <td className="px-4 py-2 border text-md text-center">{endpoint}</td>
            <td className="px-4 py-2 border text-md text-center">{status}</td>
            <td className="px-4 py-2 border text-md">{requestBody}</td>
            <td className="px-4 py-2 border text-md">{responseBody}</td>
        </tr>
    );
}
