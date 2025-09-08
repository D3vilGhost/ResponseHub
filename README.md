# ResponseHub

A comprehensive guide to understanding, integrating, and utilizing the ResponseHub effectively.

## Overview

The `/api/client/flexible` and `/api/client/fixed` endpoints allow users to interact with the API using HTTP methods like GET, POST, PUT, and DELETE.

For each API request to the `/api/client/flexible` endpoint, the user must send a POST request with a body that defines the expected response structure. The request body includes the desired `statusCode` and a `responseBody` object that outlines the response schema, supporting types like integers, strings, booleans, arrays, and objects. (View Request Format for details.)

The `/api/client/fixed` endpoint provides pre-configured API responses that are created and managed via the user's dashboard. These fixed APIs return a consistent response structure defined by the user during creation, offering reliability and simplicity. Users can manage these endpoints through the dashboard, with full control to create, update, or delete them. Each custom endpoint is accessible under the base path `/api/client/fixed/<endpoint_name>` and supports any HTTP method (GET, POST, PUT and DELETE). When creating a fixed endpoint, users specify the endpoint name, the HTTP method, and the response data in JSON format.

All requests to both `/api/client/flexible` and `/api/client/fixed` must include an API key in the request header using Bearer token authentication:

```
Authorization: Bearer \<your\_api\_key>
```

Each request responds with the status code defined in the request. The actual status codes for all requests are available in the user dashboard.

### Allowed Status Codes

-   **1xx Informational**: 100, 101, 102, 103
-   **2xx Success**: 200, 201, 202, 203, 204, 205, 206, 207, 208, 226
-   **3xx Redirection**: 300, 301, 302, 303, 304, 305, 306, 307, 308
-   **4xx Client Error**: 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451
-   **5xx Server Error**: 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511

For `/api/client/fixed` APIs, endpoint names can only include the following characters:

-   Alphanumeric (a-z, A-Z, 0-9)
-   Dot (.)
-   Dash (-)
-   Underscore (\_)

When creating a custom fixed endpoint, you should never include query parameters as part of its definition (for example, `/api/client/fixed/hello?x=1` is invalid). Endpoints must always be defined in a clean form such as `/api/client/fixed/hello`. Query parameters can be added later when you make requests to the endpoint, but they will not be processed by the server and will have no impact on the response or any calculations.

---

## Error Handling

If the request contains an error, the `data` will be set to `null` and the `error` field will contain information about the error as:

-   **message**: A brief explanation of the error.
-   **details**: A detailed explanation of why the request failed.

**NOTE:** Clients must check that `error` is non-null before accessing `data`.

## Quick Examples

### Example Flexible Request: POST Request to Create a User

```json
{
    "statusCode": 201,
    "responseBody": {
        "userId": { "type": "integer", "min": 1, "max": 100 },
        "userName": { "type": "string", "size": 1 },
        "isActive": { "type": "boolean" }
    }
}
```

### Example Response: Success with status code 201

```json
{
    "data": {
        "userId": 25,
        "userName": "hello",
        "isActive": true
    },
    "error": null
}
```

### Example Response: Error

```json
{
    "data": null,
    "error": {
        "message": "Invalid data format",
        "details": "The 'userId' field must be an integer between 1 and 50."
    }
}
```

---

## Flexible Request Format

The structure and guidelines for making custom response requests.

### Request Format

The request body must be a JSON object and follows this format:

```json
{
  "statusCode": <expected_status_code>,
  "responseBody": {
    "field1": "type1",
    "field2": "type2"
  }
}
```

-   **statusCode**: The status code that the server is expected to return. The server will respond with the specified status code, which must be a valid integer.
-   **responseBody**: A JSON object that defines the schema of the response data, including types and constraints.

---

## Response Body Types

### Integer

```json
{
    "type": "integer",
    "min": 0,
    "max": 100
}
```

-   `type: "integer"` indicates the value is a number.
-   `min`: Minimum value for the integer.
-   `max`: Maximum value for the integer.

### String

```json
{
    "type": "string",
    "size": 5
}
```

-   `type: "string"` indicates the value is a string consisting of multiple words.
-   `size`: Number of words in the string (not characters).

### Boolean

```json
{
    "type": "boolean"
}
```

-   `type: "boolean"` indicates the value is either `true` or `false`.

### Arrays

```json
{
    "type": "array",
    "item_type": "string",
    "size": 3
}
```

-   `type: "array"` indicates the value is an array.
-   `item_type`: Specifies the type of each item in the array. Possible values: `integer`, `boolean`, `string`.
-   `size`: Number of items in the array.

**NOTE:** Integer will be a random positive integer, and the string will consist of a single word of random size.

### Object

```json
{
    "type": "object",
    "properties": {
        "field1": "type1",
        "field2": "type2"
    }
}
```

-   `type: "object"` indicates the value is a JSON object.
-   `properties`: Defines the structure of the object, following the same format as the `responseBody`.
