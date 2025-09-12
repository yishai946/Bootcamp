# Exercise 5: Mission Filtering & Assignment – Tactical Orders

⏱️ *Duration: 2 days*

---

The battlefield is growing. Scouts need clarity. Commanders need control.

In this exercise, you'll expand the Cadet Dashboard with powerful **filtering capabilities**, and build the **Commander’s first operational tool** — the mission assignment form. These two parallel efforts introduce two critical new skills: **React Query for live data** and **React Hook Form for structured input and validation**.

---

## **🎯 Goal**

Introduce dynamic data handling using **React Query** and implement full-featured forms using **React Hook Form**. Enhance the **Cadet Dashboard** with mission filtering and build a new **Commander View** to assign missions to squads.

---

## **📚 Required Reading**

### 🔁 React Query (TanStack Query)

- What is React Query and why is it used?
- How to use `QueryClientProvider`
- How to use `useQuery` and `useMutation`
- What are query keys, and how does caching work?
- How to refetch or invalidate queries

---

### 📝 Forms & Input Handling

- What is **React Hook Form** and how is it different from controlled inputs?
- How to use `useForm`, `register`, and `handleSubmit`
- How to integrate MUI components with React Hook Form
- How to perform basic validation
- Difference between **controlled and uncontrolled** components
- How React Hook Form uses `register` to bind inputs
- How to set **default values** in React Hook Form
- What are the available **validation modes** and when to use them

---

### ⚙️ Additional Concepts

- What is `useMemo` and when should it be used?
- How to compute summaries or UI metadata efficiently using `useMemo`
- Why filtering and sorting should be delegated to the backend in scalable systems

---

## **🛠️ Technical Requirements**

### 🧍 Part 1: Cadet – Mission Filtering

1. Enhance the existing Cadet Dashboard:
    - Add a **filter bar** above the mission lit
    - Allow filtering by:
        - Mission type
        - Score range (min–max)
        - Status (completed, failed, ongoing)
    - Fetch missions using **React Query**, passing filtering parameters to the API
    - Update the query whenever filter inputs change — let the **backend** handle filtering logic
2. MUI Controls:
    - Use `<Select>`, `<Slider>`, or other relevant MUI inputs
    - Display number of filtered results above the list
3. Use `useMemo` to optimize **derived UI values** from the fetched data (not for filtering or sorting):
    - Memoize summary text (e.g., "You are viewing 8 Scouting missions")
    - Extract distinct values from the result (e.g., list of mission locations or statuses)
    - Stabilize transformed mission data before passing to child components (e.g., card or table views)
4. All mission data should be fetched using **React Query** (`useQuery`) from the backend

All filtering and sorting must be done on the backend. 
Use `useMemo` only for optimizing derived values or UI transformations, not for changing which missions are shown.

<aside>

💡 This is your first time using React Query with mutations. Later on, you'll likely need to perform more mutations.
Is there a way to reuse some of that logic? 
Think back to how you handled data fetching (maybe a similar approach could work here too).

</aside>

### Part 2: Commander – Mission Assignment Form

1. Create a new screen
2. Fetch all missions and all squads using `useQuery`
3. Build a form using **React Hook Form**:
    - Select a mission
    - Select a squad
4. Submit assignment using `useMutation`
    - Show **success or error feedback** using MUI Snackbar or Alert
5. Invalidate the relevant query (e.g. missions list) on success

<aside>

💡 Commander routes are protected on the backend.To access them, use a**hardcoded JWT token**(e.g. from Postman login).

Real authentication will be implemented in Exercise 6

</aside>

---

## **🧭 Functionality**

- Cadet:
    - Missions are fetched via `useQuery` with backend filtering parameters
    - Filtering inputs should update the query automatically
    - Filters should trigger a new request and display results accordingly
- Commander:
    - Form loads missions and squads dynamically
    - Submitting the form assigns the selected mission to the selected squad
    - UI displays submission result (success or error)
    - Assigned mission should disappear from available list if cached properly
    

---

## **⚠️ Boundaries & Constraints**

- Do not use `useEffect` or Axios directly — use **React Query** only
- All form input logic must be handled by **React Hook Form**
- Do **not** filter data on the client — filtering must be handled by the backend using query parameters
- Update the React Query call dynamically based on the selected filters
- Commander form should be in a **separate page** or **dialog/modal**

---

## **💡 Remarks**

This is the turning point — your UI becomes **interactive** and **reactive**, not just a viewer. React Query ensures performance and reliability, while React Hook Form ensures structured inputs and validation. From this point on, the system can **read and write** — you now control the field.

**"A good order changes the tide of battle. A clear interface executes it without delay."** — *Dot Pixis*