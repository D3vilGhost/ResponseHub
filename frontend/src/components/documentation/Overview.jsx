import React from 'react'
import { Link } from 'react-router'
export default function Overview() {
    return (
        <div>
            {/* Header */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">API Documentation</h1>
                <p className="text-gray-600 text-center mb-12">
                    A comprehensive guide to understanding, integrating, and utilizing the API Monitor effectively.
                </p>
            </div>
            {/* Content begin from here */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                <hr />
                <p>
                    The <code className="font-semibold">/api/client</code>  endpoint allows users to interact with the API using HTTP
                    methods like GET, POST, PUT, DELETE, and PATCH. Each request requires the user to define the expected
                    response structure in the body, ensuring that the data returned matches the specified format.
                    This provides flexibility in making requests and receiving data, tailored to the user's needs.
                    The endpoint can handle a variety of data types, including integers, strings, booleans, arrays, and objects,
                    making it suitable for different use cases.
                </p>
            </section>

            {/* Summary Section */}
            <section className='mb-6'>
                <h2 className="text-2xl font-semibold mb-2 gap-2">Summary</h2>
                <hr />
                <div className='mb-4'>
                    For each API request to the <code className="font-semibold">/api/client</code> endpoint,
                    the user specifies a request format that includes the HTTP method and an expected response
                    structure. The request body defines both the HTTP method (GET, POST, PUT, DELETE, PATCH)
                    and the expected structure of the response in a JSON object. This structure can include
                    various data types such as integers, strings, booleans, arrays, and objects, each with
                    specific constraints (e.g., min/max values or string lengths). This flexibility allows
                    for precise specification of what data to expect in the response.
                </div>
                <div className='mb-4'>
                    When the server processes the request, it returns a response in a consistent format.
                    The response contains a <code className="font-semibold">status-code</code>,
                    the requested data (if the request is successful),
                    and an <code className="font-semibold">error</code> field if something goes wrong.
                    The <code className="font-semibold">data</code> field will contain the actual result,
                    structured according to the defined response format, with types like integers, strings,
                    and booleans as expected.
                </div>
                <div className='mb-4'>
                    The <code className="font-semibold">error</code> field is used to distinguish actual errors
                    from the user-defined expected errors. If the user's request structure is incorrect or the
                    server encounters issues that are not related to the user's expected output
                    (e.g., missing fields, incorrect values), the response will contain a non-200 status code,
                    and the <code className="font-semibold">error</code> field will describe the problem with a
                    message and details. This ensures that actual errors (e.g., bad request or server errors)
                    are clearly differentiated from expected errors that the user has defined in the request body.
                </div>
                <div className='mb-4'>
                    By defining the response structure in advance, users can ensure that the API responds
                    with the exact data format needed, while also clearly distinguishing between the data
                    and any errors that arise during the request process.
                </div>
            </section>

            {/* Request & Response Format */}
            <section className='mb-10 text-lg'>
                <div className="font-semibold">Click Here To Know About</div>
                <ul className="list-disc pl-6">
                    <li>
                        <Link to="/docs/request" className='text-blue-600 hover:text-blue-900 hover:underline'>Request Format</Link>
                    </li >
                    <li>
                        <Link to="/docs/response" className=' text-blue-600 hover:text-blue-900 hover:underline'>Response Format</Link>
                    </li>
                </ul >
            </section >

            {/* Error Handling Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Error Handling</h2>
                <hr />
                <p>If the request contains an error, the <code className="font-semibold">status-code</code> will reflect the error
                    (e.g., 400 for bad request) and <code className="font-semibold">data</code> will be set to <strong>null</strong>
                </p>
                <p>The <strong>error</strong> field will contain information about the error:</p>
                <ul className="list-disc pl-6 mt-2">
                    <li><strong>message</strong>: A brief explanation of the error.</li>
                    <li><strong>details</strong>: A detailed explanation of why the request failed.</li>
                </ul>
            </section>

            {/* Example Request and Response Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Quick Examples</h2>
                <hr />

                {/* Example Request */}
                <h3 className="text-xl font-medium mb-2">Example Request: POST Request to Create a User</h3>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
  "method": "POST",
  "data": JSON.stringify({
    "api_key": "your_api_key",
    "expected_status_code": 201,
    "response_structure": {
      "userId": { "type": "integer", "min": 1, "max": 100 },
      "userName": { "type": "string", "min_length": 5, "max_length": 15 },
      "isActive": { "type": "boolean" }
    }
  })
}`}
                    </code>
                </pre>

                {/* Example Response */}
                <h3 className="text-xl font-medium mb-2">Example Response: Success</h3>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
  "statusCode": 201,
  "data": {
    "userId": 25,
    "userName": "JohnDoe",
    "isActive": true
  },
  "error": null
}`}
                    </code>
                </pre>

                <h3 className="text-xl font-medium mb-2">Example Response: Error</h3>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
  "statusCode": 400,
  "data": null,
  "error": {
    "message": "Invalid data format",
    "details": "The 'userId' field must be an integer between 1 and 100."
  }
}`}
                    </code>
                </pre>
            </section>


        </div >
    )
}
