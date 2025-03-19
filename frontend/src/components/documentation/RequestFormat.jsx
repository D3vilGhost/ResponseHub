import React from 'react'
import { Link } from 'react-router';
export default function RequestFormat() {
    return (
        <div>
            {/* Header */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">Request Format</h1>
                <p className="text-gray-600 text-center mb-12">
                    The structure and guidelines for making API requests.
                </p>
            </div>
            {/* Request Format Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Request Format</h2>
                <hr />
                <p>The request body must be a <span className="font-semibold">JSON</span> object that includes:</p>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
"method": "<http_method>",
"body": JSON.stringify(response_structure)
}`}
                    </code>
                </pre>
                <ul className="list-disc pl-6 mt-2">
                    <li><strong>method</strong>: Defines the HTTP method (GET, POST, PUT, DELETE, PATCH).</li>
                    <li><strong>data</strong>: Contains the expected response structure in JSON format.</li>
                </ul>
            </section>

            {/* Expected Response Structure Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Expected Response Structure</h2>
                <hr />
                <p>The <span className="font-semibold">response_structure</span> must be a <span className="font-semibold">JSON</span> object and follows this format:</p>
                <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                    <code>
                        {`{
"api_key": "<your_api_key>",
"status_code": <expected_status_code>,
"response_schema": {
    "field1": "type1",
    "field2": "type2"
    }
}`}
                    </code>
                </pre>
                <ul className="list-disc pl-6 mt-2">
                    <li><strong>api_key</strong>: Your unique API key.</li>
                    <li><strong>status_code</strong>: The status code that the server is expected to return. The server will respond with the specified status code, which must be an integer.</li>
                    <li><strong>response_schema</strong>: A JSON object that defines the schema of the response data, including types and constraints.</li>
                </ul>
            </section>

            {/* Response Schema Types Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Response Schema Types</h2>

                {/* Integer */}
                <div className='pl-6'>
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-2">Integer</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                            <code>
                                {`{
"type": "integer",
"min": 0,
"max": 100
}`}
                            </code>
                        </pre>
                        <ul className="list-disc pl-6 mt-2">
                            <li><strong>type</strong>: "integer" indicates the value is a number.</li>
                            <li><strong>min</strong>: Minimum value for the integer (e.g., 0).</li>
                            <li><strong>max</strong>: Maximum value for the integer (e.g., 100).</li>
                            {/* <li><strong>exact</strong>:(optional) I </li> */}
                        </ul>
                    </div>

                    {/* String */}
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-2">String</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                            <code>
                                {`{
"type": "string",
"min": 5,
"max": 10
}`}
                            </code>
                        </pre>
                        <ul className="list-disc pl-6 mt-2">
                            <li><strong>type</strong>: "string" indicates the value is a string.</li>
                            <li><strong>min</strong>: Minimum number of words (e.g., 5).</li>
                            <li><strong>max</strong>: Maximum number of words (e.g., 10).</li>
                        </ul>
                    </div>
                    {/* Boolean */}
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-2">Boolean</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                            <code>
                                {`{
"type": "boolean"
}`}
                            </code>
                        </pre>
                        <ul className="list-disc pl-6 mt-2">
                            <li><strong>type</strong>: "boolean" indicates the value is either <code>true</code> or <code>false</code>.</li>
                        </ul>
                    </div>

                    {/* Array of Strings */}
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-2">Arrays</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                            <code>
                                {`{
"type": "array",
"item_type": "string",
"min": 3,
"max": 5
}`}
                            </code>
                        </pre>
                        <ul className="list-disc pl-6 mt-2">
                            <li><strong>type</strong>: "array" indicates the value is an array.</li>
                            <li><strong>item_type</strong>: Specifies the type of each item in the array. Possible values are : ["integer","boolean", "string"] for now.</li>
                            <li><strong>min</strong>: Minimum number of items in the array (e.g., 3).</li>
                            <li><strong>max</strong>: Maximum number of items in the array (e.g., 5).</li>
                        </ul>
                        <strong>NOTE: Integer will be a random positive integer, and the string will consist of a single word."</strong>
                    </div>

                    {/* Object */}
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-2">Object</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                            <code>
                                {`{
"type": "object",
"properties": {
    "field1": "type1",
    "field2": "type2"
    }
}`}
                            </code>
                        </pre>
                        <ul className="list-disc pl-6 mt-2">
                            <li><strong>type</strong>: "object" indicates the value is an json object.</li>
                            <li><strong>properties</strong>: Defines the structure of the object, following the same format as the <code>response_schema</code>.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className='mb-10 text-lg'>
                <div className="font-semibold">Click Here To Know About</div>
                <ul className="list-disc pl-6">
                    <li>
                        <Link to="/docs" className=' text-blue-600 hover:text-blue-900 hover:underline'>Overview</Link>
                    </li>
                    <li>
                        <Link to="/docs/response" className='text-blue-600 hover:text-blue-900 hover:underline'>Response Format</Link>
                    </li >
                </ul >
            </section >
        </div>
    );
}
