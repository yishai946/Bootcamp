# Exercise 9: Final Operations: Promote, Create, Expel, Logout

⏱️ *Duration: 3 days*

---

The walls are secure. The squads are formed. But leadership requires more than vision — it demands action.

In this final exercise, you’ll implement all remaining system operations: **creating missions and squads**, **changing user roles**, **expelling cadets**, and **logging out**. This is your full-system wrap-up. Your tools are ready. It’s time to deploy.

---

Build the remaining interactive flows for all user roles:

## **🎯 Goal**

- **Commander**: Create missions, create squads, change roles
- **Squad Leader**: Remove cadets from squad
- **All users**: View and edit profile, and log out

---

## **📚 Required Reading**

### 🔒 Auth Flow

- How to implement a **logout** function
- Clearing localStorage / sessionStorage in React
- Redirecting after logout using `useNavigate`

---

### 🔄 Advanced Mutations

- How to update cached lists after mutation
- **Optimistic UI** patterns: when and how to use them

---

## **🛠️ Technical Requirements**

### Commander

- Create Squad
- Create Mission
- Change User Role
    - Require confirmation dialog before change
    - Update user list upon success

### Squad Leader

- Kick Cadet

### All Users

- **Logout**
    
    

---

## **🧭 Functionality**

| Feature | User Role | Description |
| --- | --- | --- |
| Create Squad | Commander | New squads added to system |
| Create Mission | Commander | New missions created |
| Change Role | Commander | Role change with confirmation |
| Kick Cadet | Squad Leader | Remove cadet from squad |
| Profile Page | All | View/edit personal data |
| Logout | All | Clear auth and redirect |

---

## **⚠️ Boundaries & Constraints**

- Do not allow changing own role
- Only allow kicking cadets who are not currently on a mission
- Use `useMutation` from **React Query** for all actions
- Protect routes using **auth context** as already implemented
- Show clear success/error messages for all actions

---

## **💡 Remarks**

This is your final deployment step. After this, the system is live and fully functional. Don’t rush — take the time to polish, test, and refactor where needed.

You’ve built a mission-critical app. Make sure every role, every action, and every edge case is accounted for.

> "**Discipline and order,  not strength, decide who survives.**" — *Levi Ackerman*
>