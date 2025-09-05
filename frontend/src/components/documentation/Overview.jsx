import React from "react";
import { Link } from "react-router";
export default function Overview() {
    return (
        <div>
            {/* Header */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Documentation
                </h1>
                <p className="text-gray-600 text-center mb-12">
                    A comprehensive guide to understanding, integrating, and
                    utilizing the ResponseHub effectively.
                </p>
            </div>
            {/* Content begin from here */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                <hr />
                <ul className="list-disc pl-6">
                    <li className="mb-2">
                        The{" "}
                        <code className="font-semibold">
                            /api/client/flexible
                        </code>{" "}
                        and
                        <code className="font-semibold">
                            /api/client/fixed
                        </code>{" "}
                        endpoints allow users to interact with the API using
                        HTTP methods like GET, POST, PUT, and DELETE.
                    </li>
                    <li className="mb-2">
                        For each API request to the{" "}
                        <code className="font-semibold">
                            /api/client/flexible
                        </code>{" "}
                        endpoint, the user must send a{" "}
                        <span className="font-semibold">POST</span> request with
                        a body that defines the expected response structure. The
                        request body includes the desired{" "}
                        <code className="font-semibold">status_code</code> and a{" "}
                        <code className="font-semibold">response_schema</code>{" "}
                        object that outlines the response schema, supporting
                        types like integers, strings, booleans, arrays, and
                        objects. (View Request Format for details.)
                    </li>
                    <li className="mb-2">
                        The{" "}
                        <code className="font-semibold">/api/client/fixed</code>{" "}
                        endpoint provides pre-configured API responses that are
                        created and managed via the user's dashboard. These
                        fixed APIs return a consistent response structure
                        defined by the user during creation, offering
                        reliability and simplicity. Users can manage these
                        endpoints through the dashboard, with full control to
                        create, update, or delete them. Each custom endpoint is
                        accessible under the base path
                        <code className="font-semibold">
                            /api/client/fixed/&lt;endpoint_name&gt;
                        </code>{" "}
                        and supports any HTTP method (
                        <span className="font-semibold">
                            GET, POST, PUT and DELETE.
                        </span>
                        ). When creating a fixed endpoint, users specify the
                        endpoint name, the HTTP method, and the response data in
                        JSON format.
                    </li>
                    <li className="mb-2">
                        All requests both{" "}
                        <code className="font-semibold">
                            /api/client/flexible
                        </code>{" "}
                        and{" "}
                        <code className="font-semibold">
                            /api/client/fixed{" "}
                        </code>
                        must include an API key in the request header using
                        Bearer token authentication: : <br />
                        <code className="font-semibold">
                            "Authorization: Bearer &lt;your_api_key&gt;"{" "}
                        </code>
                    </li>
                    <li className="mb-2">
                        Each request responds with the status code defined in
                        the request. The actual status codes for all requests
                        are available in the user dashboard
                    </li>
                    <li className="mb-2">
                        Allowed status codes for both type of endpoints include:
                        <br />
                        <strong>1xx Informational:</strong> 100, 101, 102, 103
                        <br />
                        <strong>2xx Success:</strong> 200, 201, 202, 203, 204,
                        205, 206, 207, 208, 226
                        <br />
                        <strong>3xx Redirection:</strong> 300, 301, 302, 303,
                        304, 305, 306, 307, 308
                        <br />
                        <strong>4xx Client Error:</strong> 400, 401, 402, 403,
                        404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
                        415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428,
                        429, 431, 451
                        <br />
                        <strong>5xx Server Error:</strong> 500, 501, 502, 503,
                        504, 505, 506, 507, 508, 510, 511
                    </li>
                    <li className="mb-2">
                        For{" "}
                        <code className="font-semibold">/api/client/fixed</code>{" "}
                        APIs, endpoint names can only include the following
                        characters: <br />
                        Alphanumeric (<code>a-z</code>, <code>A-Z</code>,{" "}
                        <code>0-9</code>), Dot (<code>.</code>), Dash (
                        <code>-</code>), Underscore (<code>_</code>), EqualTo (
                        <code>=</code>), QuestionMark (<code>?</code>), and
                        Ampersand (<code>&amp;</code>).
                    </li>
                </ul>
            </section>

            {/* Request & Response Format */}
            <section className="mb-10 text-lg">
                <div className="font-semibold">Click Here To Know About</div>
                <ul className="list-disc pl-6">
                    <li>
                        <Link
                            to="/docs/response"
                            className=" text-blue-600 hover:text-blue-900 hover:underline"
                        >
                            Response Format
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/docs/request/flexible"
                            className="text-blue-600 hover:text-blue-900 hover:underline"
                        >
                            Flexible Request Format
                        </Link>
                    </li>
                </ul>
            </section>

            {/* Error Handling Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Error Handling</h2>
                <hr />
                <p>
                    If the request contains an error, the{" "}
                    <code className="font-semibold">data</code> will be set to{" "}
                    <code className="font-semibold">null</code> and the{" "}
                    <code className="font-semibold">error</code> field will
                    contain information about the error as :
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <code className="font-semibold">message</code>: A brief
                        explanation of the error.
                    </li>
                    <li>
                        <code className="font-semibold">details</code>: A
                        detailed explanation of why the request failed.
                    </li>
                </ul>
                <br />
                <p>
                    {" "}
                    <strong>NOTE:</strong> Clients must check that error is non
                    null before accessing data.
                </p>
            </section>

            {/* Example Request and Response Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Quick Examples</h2>
                <hr />

                {/* Example Request */}
                <h3 className="text-xl font-medium mb-2">
                    Example Flexible Request: POST Request to Create a User
                </h3>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
  "status_code": 201,
  "response_schema": {
            "userId": { "type": "integer", "min": 1, "max": 100 },
            "userName": { "type": "string", "size": 1 },
            "isActive": { "type": "boolean" }
          }
}`}
                    </code>
                </pre>

                {/* Example Response */}
                <h3 className="text-xl font-medium mb-2">
                    Example Response: Success with status code 201
                </h3>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
  "data": {
    "userId": 25,
    "userName": "awqKze",
    "isActive": true
  },
  "error": null
}`}
                    </code>
                </pre>

                <h3 className="text-xl font-medium mb-2">
                    Example Response: Error{" "}
                </h3>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
  "data": null,
  "error": {
    "message": "Invalid data format",
    "details": "The 'userId' field must be an integer between 1 and 50."
  }
}`}
                    </code>
                </pre>
            </section>
        </div>
    );
}
