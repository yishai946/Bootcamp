# Exercise 6: Authentication & Role-Based Routing – Know Your Station

⏱️ *Duration: 2 days*

---

The time has come to stop pretending. No more hardcoded tokens, no more open access.

In this exercise, you’ll build a fully working authentication system: new cadets can **register**, existing users can **log in**, and only authorized roles can access their assigned routes. From now on, the system will know who you are — and show only what you are allowed to see.

---

## **🎯 Goal**

Implement full authentication using the backend’s login and registration endpoints. Store and use real JWT tokens. 
Set up a global mechanism to manage authentication and access control. Restrict route access based on the user's role, and ensure users are redirected to the appropriate screen after logging in.

---

## **📚 Required Reading**

### 🔐 Authentication Basics

- What is a **JWT** and what does it contain?
- How does **stateless authentication** work in frontend apps?
- How to decode a JWT in the client (`jwt-decode`)
- How to securely store tokens (localStorage vs memory)

---

### ⚙️ React Architecture

- How to build **protected routes** with React Router
- How to **redirect users by role** (cadet, squad leader, commander)
- How to **logout** and clear user state

---

## **🛠️ Technical Requirements**

### 1. Create Login and Registration Forms

- Use **React Hook Form** with validation
- Login form:
    - Email and password
    - Submit via `POST /auth/login`
- Registration form:
    - Name, email, password
    - Default role = cadet
    - Submit via `POST /auth/register`
- Show feedback on success or error

### 2. Set up global authentication state

- After a successful login, persist the authentication token securely
- Make relevant user data (e.g. ID and role) available throughout the app
- Expose utility functions to manage login status and handle logout
- Ensure this logic is accessible from anywhere in the application

### 3. Axios Configuration

- Set up an Axios instance with an **Authorization header** automatically
- Token should be attached to all future requests
- Redirect to `/login` if the token is missing or expired (401 handling)

### 4. Protect Routes

- Only allow access to role-specific routes:
    - `/cadet` → only cadets
    - `/leader` → only squad leaders
    - `/commander` → only commanders
- Add a `ProtectedRoute` wrapper:
    - Redirect to `/403` (unauthorized) or `/login` if needed
- Automatically redirect logged-in users to their correct dashboard on login

---

## **🧭 Functionality**

- Users can register as cadets
- Users can log in and access their protected dashboard
- All future API requests use the JWT from login
- Accessing the wrong role route redirects to `/403`
- Accessing any protected route without a token redirects to `/login`
- Logout clears the token and redirects to `/login`

---

## **⚠️ Boundaries & Constraints**

- Token must be stored only in `localStorage` (no cookies/session)
- Do not mix hardcoded tokens anymore — only real login is allowed from now
- Role checking logic must be reusable (e.g. via a hook or route wrapper)
- Forms must use **React Hook Form**

---

## **💡 Remarks**

With this exercise, the Scout Regiment Interface becomes a real system. Roles determine access. Sessions persist across reloads. The backend now knows who you're fighting for — and the frontend ensures only the right eyes see the plan.

> **"Only those who know their role can truly defend the walls."** — *Commander Erwin Smith*
>