import React from 'react'
import { Link } from 'react-router'
export default function ResponseFormat() {
    return (
        <div>
            {/* Header */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">Response Format</h1>
                <p className="text-gray-600 text-center mb-12">
                    What to expect in the server's response.
                </p>
            </div>

            {/* Response Format Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Response Format</h2>
                <hr />
                <p>The server will return a response in this format:</p>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
  "data":  <requested_data> ,
  "error": {
    "message": "brief_error_message",
    "details": "detailed_description_of_error"
  }
}`}
                    </code>
                </pre>
                <ul className="list-disc pl-6 mt-2">
                    <li><strong>data</strong>: Contains the requested data formatted according to the <code>response_schema</code>.</li>
                    <li><strong>error</strong>: Contains details about the error, if something goes wrong.</li>
                </ul>
                <p className='py-4'>
                    If the server doesn't encounter any errors in the request or internally, the data field will have the data, and the error field will be null.
                    If there's an error, the error field will show the error, and the data field will be null.
                </p>
            </section>
            <section className='mb-10 text-lg'>
                <div className="font-semibold">Click Here To Know About</div>
                <ul className="list-disc pl-6">
                    <li>
                        <Link to="/docs" className=' text-blue-600 hover:text-blue-900 hover:underline'>Overview</Link>
                    </li>
                    <li>
                        <Link to="/docs/request/flexible" className='text-blue-600 hover:text-blue-900 hover:underline'>Flexible Request Format</Link>
                    </li >
                </ul >
            </section >

        </div>
    )
}
