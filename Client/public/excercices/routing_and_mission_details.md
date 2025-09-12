# Exercise 4: Routing & Mission Details – Beyond the Walls

⏱️ *Duration: 2 day*

---

As a cadet, you’ve trained inside the safety of your dashboard. But now it’s time to step outside the static interface and navigate across screens. From mission lists to mission reports, you must learn to traverse the system like a true Scout.

This exercise marks your first step into a **multi-page application** — you’ll add routing, dynamic paths, and a dedicated page for viewing mission details.

---

## **🎯 Goal**

Implement routing using React Router. Build a separate screen for mission details and connect it to the mission list. Learn how to define routes, pass route parameters, and navigate between pages using `Link` and `useNavigate`.

---

## **📚 Required Reading**

### 🧭 React Router Basics

- What is **React Router** and how does it work?
- What is the purpose of `BrowserRouter`?
- What are **`Routes`** and **`Route`** components?
- How does routing work in **single-page applications** (SPA)?

---

### 🔑 Route Handling

- What is a **dynamic route** (e.g. `/missions/:missionId`)?
- How to use `useParams()` to extract data from the URL
- What is the difference between `Link`, `NavLink`, and `useNavigate()`?

---

### 📐 App Architecture

- How to organize components when using routing (e.g. `pages/`, `components/`)
- What is a **screen/page component** vs. a reusable component?

---

## **🛠️ Technical Requirements**

1. **Set up routing for your application:**
    - Use **React Router** to enable navigation between different screens
    - Define at least two routes: one for the main dashboard, and one for viewing a specific mission by ID
2. **Implement route-based navigation:**
    - Enable users to navigate to the mission detail screen when interacting with a mission entry
3. **Build a dynamic mission details view:**
    - Extract the mission identifier from the URL
    - Display relevant mission data based on that ID
4. **Structure your project cleanly:**
    - Keep route-specific screens in a dedicated directory
    - Maintain separation between pages and reusable UI components
5. **Enhance performance with lazy loading:**
    - Use **code-splitting** to defer loading of route-based screens
    - Wrap your routed views in **Suspense** with a fallback for loading state

---

## **🧭 Functionality**

- Clicking a mission in the cadet view should navigate to `/missions/:id`
- The details page should render relevant mission info
- The mission ID should be dynamic via the URL param
- Navigation must work both via button click and direct URL entry

---

## **⚠️ Boundaries & Constraints**

- Do not store the selected mission in global state; use the URL only
- Do not add a 404 fallback route yet  (this will be added in the next exercise)

---

## **💡 Remarks**

This exercise transforms your interface into a true **multi-view system**, where different components are rendered depending on the user’s actions and navigation. This will serve as the foundation for routing all roles: cadets, squad leaders, and commanders.

**"A true scout learns to move between unknown paths."** — *Hange Zoë*