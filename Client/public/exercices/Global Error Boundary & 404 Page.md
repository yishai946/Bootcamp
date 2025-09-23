# Exercise 4.5: Global Error Boundary & 404 Page – Holding the Line

⏱️ *Duration: 0.5 day*

---

Even the most battle-ready interface can fail. Components might crash. Users may wander into nonexistent routes. As a scout, you don’t panic — you prepare.

This exercise introduces a **global error boundary** to catch unexpected UI failures, and a **404 fallback page** to handle lost paths. These defenses ensure the system remains stable, clear, and user-friendly even in uncertain conditions.

---

## **🎯 Goal**

Implement a **global Error Boundary** to catch unhandled rendering errors and display a fallback UI. Add a **404 Not Found** route using React Router for undefined paths.

---

## **📚 Required Reading**

### 💥 Error Handling in React

- What is an **Error Boundary**?
- Why must it be a **class component**?
- What is the `componentDidCatch` lifecycle method?
- When does an error boundary catch errors (and when not)?

---

### 🧭 404 Routing

- What is a **catch-all route** in React Router?
- How to define a `Route` with `path="*"` to handle unknown URLs
- Best practices for designing a 404 page

---

## **🛠️ Technical Requirements**

1. **Add a global error boundary:**
    - Implement a component that catches unexpected rendering errors and shows a user-friendly fallback UI
    - The fallback should clearly communicate that something went wrong and optionally allow the user to recover (e.g., by reloading the page)
2. **Apply the error boundary globally:**
    - Wrap the entire application with the error boundary
    - Ensure it’s placed in a way that can catch errors from any route or screen
3. **Handle unknown routes:**
    - Define a fallback route that renders a "Not Found" screen when the user navigates to an undefined path
    - The screen should display a clear message and offer navigation back to a valid entry point (like the dashboard)

---

## **🧭 Functionality**

- The `ErrorBoundary` should:
    - Catch component render-time errors
    - Show a clear fallback UI (not a blank screen or crash)
- The 404 route should render only when no other route matches
- Direct URL navigation to `/something-weird` should go to the 404 page
- Users should be able to return to the main app from both error states

---

## **⚠️ Boundaries & Constraints**

- Do not implement custom logging or error reporting
- The 404 route must be added as the **last route** to catch all unmatched paths
- Use MUI for consistent styling in fallback/error pages

---

## **💡 Remarks**

This exercise ensures your system can withstand the unexpected. Whether a component breaks or a user gets lost, your interface should respond with clarity — not chaos.

> **"Even when a wall collapses, a scout stands tall and redirects the survivors."** — *Levi Ackerman*
>