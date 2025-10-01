## Overview

This project’s frontend is built using **React** with **TailwindCSS** for styling and **React Router** for client-side routing. The application interacts with backend APIs (proxied to `localhost:5000`) to handle authentication, records management, and endpoint creation.

---

## Tech Stack

-   **React** – Component-based UI framework.
-   **TailwindCSS** – Utility-first CSS framework for styling.
-   **React Router** – Client-side routing for navigation without full page reloads.
-   **Proxy** – API requests with prefix `/api` are forwarded to `http://localhost:5000`.

## Routing

The app uses **React Router v6** for navigation. Below are the available routes:

| Route                    | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `/`                      | Landing page (intro and overview of the product).                 |
| `/docs`                  | Main documentation page.                                          |
| `/docs/response`         | Documentation for the **response format**.                        |
| `/docs/request/flexible` | Documentation for the **flexible request format**.                |
| `/login`                 | Login page for existing users.                                    |
| `/signup`                | Signup page for new user registration.                            |
| `/dashboard`             | Main user dashboard to manage records and create fixed endpoints. |

## Running the frontend

```bash
npm i
npm run dev
```

This runs the app on `http://localhost:5173/`.

## Running with backend

Make sure backend is running on `http://localhost:5000/` so that API proxy works correctly.

## Storing API Key in Frontend

-   User's API Key is stored in-memory which increases security.
-   When Page Loads, frontend requests backend for the API-Key details by usefetchApiKey hook
-   Cookies are used for other operations in dashboard
-   Cookie stores a jwt token which stores username of user
