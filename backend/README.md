## Overview

The backend provides REST APIs for authentication, dashboard management, record handling, and client-facing endpoints. Authentication is JWT-based, and client APIs require an Authorization header.

There are two main categories of APIs:

-   `/api/server` → for server-side operations (auth, dashboard, records).
-   `/api/client` → for client-facing operations (fixed and flexible endpoints).

---

### Authentication

-   `POST /api/server/auth/login`
    Accepts email and password in the request body. Returns a JWT token upon successful login.

-   `POST /api/server/auth/signup`
    Accepts name, email, and password in the request body. Creates a new user and returns a JWT token.

-   `POST /api/server/auth/logout`
    Requires JWT authentication. Logs out the user, invalidating the session/token if implemented.

---

### Dashboard Management

-   `GET /api/server/dashboard/key`
    Requires JWT authentication. Returns the user’s API key.

-   `GET /api/server/dashboard/fixed`
    Requires JWT authentication. Fetches all fixed endpoints created by the user.

-   `POST /api/server/dashboard/fixed`
    Requires JWT authentication. Creates a new fixed endpoint.

-   `PUT /api/server/dashboard/fixed`
    Requires JWT authentication. Updates the specified fixed endpoint.

-   `DELETE /api/server/dashboard/fixed`
    Requires JWT authentication. Accepts endpoint and method in the request parameters. Deletes the specified fixed endpoint.

---

### Record Management

-   `GET /api/server/dashboard/record`
    Requires JWT authentication. Accepts a query parameter `page` for pagination. Returns paginated records.

-   `DELETE /api/server/dashboard/record`
    Requires JWT authentication. Clears all stored records for the user.

---

### Client-Side APIs

-   `GET/POST/PUT/DELETE /api/client/fixed/{endpoint}`
    Requires Authorization header. Returns fixed endpoints defined by the user for the specified method if available.

-   `POST /api/client/flexible`
    Requires Authorization header. Accepts a flexible request body and processes it dynamically.

---

# Project Integration

### Fixed API Integration:

-   In this case just updating your URL variable makes your code ready for use with real service.
-   In this case user can change the method of request between GET/POST/PUT/DELETE.
-   Also Query Parameter doesn't affect any processing, thus providing crazy level of customisation for your needs :)

```javascript
const URL = "localhost:5000/api/client/fixed";
const myData = {};

// in my data you can send whatever data you want to send as its not processed by backend
// this api only depends on endpoint and method of HTTP request
// thus perfect for personalised customisation

const res = await fetch(`${URL}/myApi`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify(myData),
});

const responseData = await res.json();

// error handling
if (responseData.error) {
    console.log(responseData.error.details);
    throw new Error(responseData.error.message);
}

const finalData = responseData.data;
```

### Flexible API Integration

-   This type of API is perfect for use if you dont know endpoints or want random data in some specific manner for testing purpose or something else.
-   In this type method is fixed to be POST.
-   Also Query Parameter doesn't affect any processing, thus providing crazy level of customisation for your needs :)

```javascript
const responseSchema = {
    statusCode: STATUS_CODE,
    responseBody: {},
};

// in this case responseSchema needs to follow proper standards as mentioned in docs
// responseBody defines the JSON structure server responds back with

const res = await fetch("localhost:5000/api/client/flexible", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify(responseSchema),
});

const responseData = await res.json();

// error handling
if (responseData.error) {
    console.log(responseData.error.details);
    throw new Error(responseData.error.message);
}

const finalData = responseData.data;
```

### Sample responseBody

Example #1 :

```json
{
    "user": {
        "type": "string",
        "size": 1
    },
    "age": {
        "type": "integer",
        "min": 18,
        "max": 100
    },
    "isActive": {
        "type": "boolean"
    }
}
```

Example #2 :

```json
{
    "user": {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string",
                "size": 1
            },
            "lastName": {
                "type": "string",
                "size": 1
            }
        }
    },
    "friends": {
        "type": "array",
        "item_type": "string",
        "size": 10
    }
}
```
