# Exercise 3: Bringing the Data to Life – First Intel from HQ

⏱️ *Duration: 3 days*

---

Your cadet dashboard was a simulation. It’s time to make it real. In this exercise, you’ll replace mock data with real API calls using **Axios** and manage **loading states** with proper UI feedback using MUI Skeletons. You’ll also handle failed requests gracefully.

This is your first connection to the backend system — build it well.

---

## **🎯 Goal**

Replace static mock data with real mission data from the backend using Axios and `useEffect`. Add loading and error UI using MUI components. Learn how to work with async data in React and display it cleanly and reliably.

---

## **📚 Required Reading**

### 🌀 React Concepts

- What is a **side effect** in React?
- How does the **`useEffect`** hook work? When does it run?
- What is the **dependency array** in `useEffect`?
- What is a **custom hook** in React?
- How and when should we extract logic into a reusable hook?

---

### 🌐 API & Async Code

- How to use **Axios** to make GET requests
- How to attach headers (`Authorization: Bearer <token>`)
- What is `async/await` in JavaScript?
- How to handle API **errors** and avoid unhandled promise rejections

---

### 🎨 MUI UI States

- How to use **MUI Skeleton** components
- How to show **loading spinners** or placeholders
- How to show **error messages** using Typography or Alerts

---

### 🧠 Good Practices

- What is an **API abstraction layer** (e.g. `missionApi.ts`)?
- Why should we avoid hardcoding URLs inside components?

---

## **🛠️ Technical Requirements**

1. Remove the mock data in your `MissionList` and replace it with real data fetched via Axios.
    - Use `useEffect` + `useState` to fetch and store the data
        
        (Consider: Can this logic be reused later? If so, how would you structure it more cleanly?)
        
    - **Pass a valid hardcoded JWT token** in the `Authorization` header
2. Show a **Skeleton** loading state while data is being fetched
    - At least 2–3 cards as placeholders with MUI’s `Skeleton`
3. Handle API errors gracefully
    - If the fetch fails, display an error message in the UI
    - Do **not** crash the screen

---

## **🧭 Functionality**

- The data must be **fetched dynamically** via `useEffect`
- No mock data should remain
- Skeletons should be shown during loading
- Mission list should display real missions for the cadet (you can hardcode the cadet ID for now)
- Error message should be visible if fetch fails (no silent failures)

---

## **⚠️ Boundaries & Constraints**

- Do not use any data fetching library yet (e.g. no React Query/TanStack)
- Do not show a blank screen while loading — always show skeletons or spinners
- The token must be hardcoded only temporarily (login will be added later)

---

## **💡 Remarks**

This is your first real connection between UI and backend — a core skill of full-stack development. 
By the end of this exercise, you’ll be able to fetch and display live mission data with responsive, user-friendly UI.

You're now operating with real intel. And the missions have just begun.

> “**Information wins battles. But only if it reaches the ones who need it.**” — *Erwin Smith*
>