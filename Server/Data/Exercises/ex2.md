# Exercise 2: Cadet Status Panel – First View from the Walls

⏱️ *Duration: 3 days*

---

As a new recruit in the Frontend Corps, you're now granted your first access to the **Scouting Regiment Management System (SRMS)** — the tool that every soldier relies on for mission intel and squad coordination.

Your first task is to build the **Cadet Dashboard** — the personal interface every scout uses to review their profile, track missions, and stay ready for orders. The data is still mock for now, but the interface must be real. You’re not just building a UI — you’re designing the template that all future dashboards will follow.

This is where the SRMS interface begins to breathe.

---

## **🎯 Goal**

- Set up a complete React + TypeScript project from scratch, without using any template or scaffold.
- Learn to configure Vite, ESLint, Prettier, and TypeScript manually.
- Build the static layout of the Cadet Dashboard using MUI and structure your app like a real-world project.
- Get familiar with components, local state, and provider pattern.

---

## **📚 Required Reading**

### ‣ React Concepts & Fundamentals

- What is React and what problems does it solve?
- What is JSX, and how is it different from HTML?
- What is the Virtual DOM, and why is it fast?
- What is a React function component, and how do you define one?
- What is the difference between functional and class components? Why are functional components preferred today?
- How does React render into the DOM using ReactDOM.createRoot()?
- What are props and state (basic understanding)?
- How do props work? What is `children`?
- What are React Fragments, and when should you use them?
- How does useState work?
- How do you pass and type props using TypeScript?
- How do you structure components in a modular and reusable way?
- What is the purpose of `index.html`, `index.tsx`, and `App.tsx` in a React project?

---

### 🎨 MUI & Layout

- How to use MUI layout components: `Box`, `Stack`, `AppBar`, `Container`
- What are the basic principles of **responsive layout** in MUI?
- How to apply a **custom MUI theme** using `ThemeProvider`
- How to customize MUI’s theme (palette, typography)

---

### 🧩 React Architecture

- What is a **React Provider**?
- What is the **Context API** and how do you use it at a high level?
- What is the purpose of a shared `AppProviders.tsx` wrapper?

---

## **🛠️ Technical Requirements**

### 1. **Set up your frontend project manually**

- Initialize a new project using `npm init vite@latest`
- Choose **React + TypeScript** as the base
- Install and configure:
    - `ESLint`
    - `Prettier`
    - `@mui/material`, `@emotion/react`, `@emotion/styled`
- Manually create the following structure:

```
/src
  App.tsx
  main.tsx
  components/
  pages/
  theme/
  providers/
  mock/

/public
  index.html

tsconfig.json
vite.config.ts
.eslintrc.cjs
.prettierrc
```

### 2. **Build the Cadet Dashboard layout**

- Add a top navigation bar (e.g., “Scouting Dashboard”)
- Add a main content area showing the cadet’s **basic info** and list of **missions**
- Use MUI for layout and styling
- Break the UI into components
- Add interactivity with `useState`
- Allow toggling a mission’s “expanded” view to show more mock details (no real logic needed yet)

### 3. Create and apply a custom **MUI theme**:

- Set a color palette that fits the Attack on Titan vibe
- Use `ThemeProvider` to wrap the app

---

## **🧭 Functionality**

- The layout must be responsive
- Mission data should come from a static `mockCadet.ts` file
- Cadet and Mission models must reflect the real backend schema (simplified if needed)
- No actual fetching yet — just build the **structure and look**

---

## **⚠️ Boundaries & Constraints**

- Do not fetch any real data yet
- Do not hard-code mission cards inside the JSX
- This is a **single-screen layout only** — do not add **routing** or multiple pages. All content should be rendered within one screen.
- Component props must be typed using TypeScript
- Linting and formatting should be active

---

## **💡 Remarks**

This is your first real glimpse into the Scouting Regiment Interface. It's not yet connected to the backend, but it should look and feel like a working system. You’re setting the design foundation for all roles and screens to come.

Prepare your UI as if the data were real — because soon, it will be.

> "**Before a soldier swings their first blade, they must know their battlefield.**" — *Mikasa Ackerman*
>