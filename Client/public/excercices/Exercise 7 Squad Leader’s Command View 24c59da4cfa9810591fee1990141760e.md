# Exercise 7: Squad Leader’s Command View

⏱️ *Duration: 5 days*

---

As a squad leader, you're no longer just surviving — you're leading.

The time has come to manage your team, monitor your missions, and take ownership of the front lines.

This exercise gives you the tools to control your squad’s operations and lead them through real missions.

---

## **🎯 Goal**

Build the **Squad Leader Dashboard**:

- View squad missions and filter them by type/status
- View all cadets in your squad
- Add or remove cadets from the squad using proper mutation flows
- Build a **Squad Formation Grid** — a local-only grid to position cadets for missions, simulating tactical planning
- Use React Query for fetching and mutating data, and apply strong client-side **state management patterns** for the formation logic

This exercise emphasizes **querying multiple resources**, **mutations**, **stateful UI modeling**, **cache invalidation**, **filtering**, and **component reusability**.

---

## **🛠️ Technical Requirements**

### 1. **Squad Leader Dashboard**

- Fetch missions assigned to the squad
- Fetch cadets in the squad
- Display mission
- Display cadets

### 2. **Filter**

- Add filter UI for both **missions** (e.g. type, status) and **cadets** (e.g. name, birth year)
- Filtering should be powered by **backend query parameters**
- Use `useMemo` to avoid recomputation for derived UI summaries (e.g. “5 active missions”, “3 cadets under 20”)

### 3. **Manage Squad Members**

- Add "Remove" button on each `CadetCard`
- Use `useMutation` to remove a cadet
- Invalidate squad data on success
- Show `Snackbar` feedback (success/failure)

### 4. **Add Cadet Modal**

- Button to open a modal with form/select input
- Fetch cadets not currently in squad (or simulate)
- Use mutation to assign cadet to the squad

### 5. **Client-Side Challenge: Squad Formation Grid**

- Create a **visual squad formation area t**o conceptually represent cadet positioning
- Let the squad leader **assign cadets to grid cells**
- Prevent assigning the same cadet to multiple cells
- Allow clearing or changing assignments easily
- Store everything in **local component state** (no backend involved)
- Use `useMemo` to summarize the formation (e.g., number of filled positions, list of unassigned cadets)
- Ensure clean UI feedback for constraints (e.g., slot full, cadet already assigned)

---

## **🧭 Functionality**

| Endpoint | Action |
| --- | --- |
| GET /missions?squadId=X | Fetch squad missions |
| GET /squads/{id}/cadets | Fetch cadets in squad |
| DELETE /squads/{id}/cadets/{cadetId} | Remove cadet from squad |
| POST /squads/{id}/cadets | Add cadet to squad (body: cadetId) |

---

## **⚠️ Boundaries & Constraints**

- Routes are **protected**: use a valid JWT token of a squad leader
- No unhandled rejections — all requests must be wrapped safely
- Use `Skeleton` or spinners where needed

---

## **💡 Remarks**

This is your first experience building **a real dashboard** for a specific role. You’ll practice complex data flows, master mutation patterns, and begin thinking like a product engineer — handling errors, edge cases, and reusability.

> "**To lead others, first learn to control yourself.**" — Levi Ackerman
>