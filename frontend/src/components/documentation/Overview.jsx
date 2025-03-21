import React from 'react'
import { Link } from 'react-router'
export default function Overview() {
    return (
        <div>
            {/* Header */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">Documentation</h1>
                <p className="text-gray-600 text-center mb-12">
                    A comprehensive guide to understanding, integrating, and utilizing the ResponseHub effectively.
                </p>
            </div>
            {/* Content begin from here */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                <hr />
                <ul className="list-disc pl-6">
                    <li className="mb-2">
                        The <code className='font-semibold'>/api/client/flexible</code> and
                        <code className="font-semibold">/api/client/fixed</code> endpoints allow users to interact with
                        the API using HTTP methods like GET, POST, PUT, DELETE, and PATCH. Both endpoints cater to
                        different use cases.
                    </li>
                    <li className='mb-2'>
                        <code className='font-semibold'>/api/client/flexible:</code>{" "}
                        Allows dynamic API interactions, where users can specify the structure and type of data
                        they expect in the response. This endpoint is suitable for flexible, on-the-fly requests and responses.
                    </li>
                    <li className='mb-2'>
                        <code className='font-semibold'>/api/client/fixed:</code>{" "}
                        Allows users to create predefined, fixed API endpoints through the dashboard.
                        These endpoints return a fixed response structure, as defined by the user,
                        and can be edited or deleted directly from the dashboard.
                    </li>
                </ul>
            </section>

            {/* Summary Section */}
            <section className='mb-6'>
                <h2 className="text-2xl font-semibold mb-2 gap-2">Summary</h2>
                <hr />
                <div className='mb-4'>
                    For each API request to the <code className="font-semibold">/api/client/flexible</code> endpoint,
                    the user specifies a request format that includes the HTTP method and the expected response structure.
                    The request body defines both the HTTP method (GET, POST, PUT, DELETE, PATCH) and the expected
                    structure of the response in a JSON object. This structure can include various data types such as
                    integers, strings, booleans, arrays, and objects, each with specific constraints
                    (e.g., min/max values or string lengths). This flexibility allows for precise specification
                    of what data to expect in the response.
                </div>
                <div className='mb-4'>
                    The <code className="font-semibold">/api/client/fixed</code> endpoint provides pre-configured
                    API responses that are created and managed via the user's dashboard. These fixed APIs will
                    always return the same structure as defined by the user when creating the fixed endpoint,
                    offering consistency and simplicity. Users can edit or delete these fixed APIs through the
                    dashboard interface.
                    Users can manage API endpoints through their dashboard, with the ability to create, update, or delete endpoints.
                    Each custom endpoint will be available under the base path <code className="font-semibold">/api/client/fixed/{"<endpoint_name>"}</code>.
                    When a user creates a new endpoint, they specify the endpoint name, the HTTP method (GET, POST, PUT, DELETE, PATCH), and the response data that
                    the endpoint will return. This data will be structured in JSON format.

                </div>
            </section>

            {/* Request & Response Format */}
            <section className='mb-10 text-lg'>
                <div className="font-semibold">Click Here To Know About</div>
                <ul className="list-disc pl-6">
                    <li>
                        <Link to="/docs/response" className=' text-blue-600 hover:text-blue-900 hover:underline'>Response Format</Link>
                    </li>
                    <li>
                        <Link to="/docs/request/flexible" className='text-blue-600 hover:text-blue-900 hover:underline'>Flexible Request Format</Link>
                    </li >
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
                <h3 className="text-xl font-medium mb-2">Example Flexible Request: POST Request to Create a User</h3>
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
