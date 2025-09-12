# Exercise 8: Full Commander View & Profile Page

⏱️ *Duration: 4 days*

---

The battlefield is vast — and a true commander must oversee all its pieces.

In this exercise, you’ll implement the final **data visibility layer** for commanders, giving them access to all cadets, squad leaders, and missions — with **pagination** and **prefetching** for performance. Alongside that, every user finally gets a **profile page**, where they can view and edit their own information.

---

## **🎯 Goal**

Enable the **Commander** to view all data with proper pagination, and allow **all users** to view/edit their own profile. Introduce key performance patterns like **prefetching**, and reinforce good UX with form reuse and role-based protection.

---

## **📚 Required Reading**

### Pagination & Prefetching

- What is **pagination**? Why do we paginate?
- How to paginate API data using React Query (`getNextPageParam`)
- What is **prefetching**, and how does it improve performance?
- How to use `queryClient.prefetchQuery` in React Query
- How to design paginated components with MUI (`Table`, `Pagination`, `CardList`, etc.)

---

## **🛠️ Technical Requirements**

### Commander – Global Views

1. Create **3 views** for the Commander:
    - **All Cadets**
    - **All Squad Leaders**
    - **All Missions**
2. Each view should:
    - Fetch paginated data
    - Include pagination controls (e.g. MUI `<Pagination>` or Load More button)
    - Display results in cards, tables, or lists
3. Add **prefetching** on hover for:
    - Squad Leader cards → prefetch cadets of that squad
    - Mission cards → prefetch assigned squad or mission details

### User – Profile Page

1. Add a new route `/profile`
2. Fetch the logged-in user’s details using the **JWT (from AuthContext)**
3. Display a form with the user’s information:
    - Name, role (non-editable), squad (if cadet), average score (if cadet), etc.
    - Use **React Hook Form** with default values
4. Allow updating editable fields
5. Show success/error feedback using MUI Snackbar

---

## **🧭 Functionality**

- Commander:
    - Can view full lists of cadets, squad leaders, and missions
    - Pagination is functional and responsive
    - Hovering over cards triggers background data prefetching
- All users:
    - Can view `/profile` with their own data
    - Can update editable fields via form
    - Role/squad info shown but not editable

---

## **⚠️ Boundaries & Constraints**

- Use `queryClient.prefetchQuery` for hover preloading
- Profile form must use **React Hook Form** with default values
- Profile must use **user info from JWT decoding (AuthContext)** — do not hardcode
- Do not allow editing of protected fields (e.g. role, squad assignment for cadets)

---

## **💡 Remarks**

Pagination teaches you to handle **real-world scale**. Prefetching makes the system **feel fast** before the user even clicks. And profile management turns this from a toy project into a **real application**. These skills reflect actual production patterns.

> “**Only those who can master the big picture deserve to command it.**” — Commander Nile Dok
>