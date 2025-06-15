# 📚 Full Stack Open  
**Fundamentals of Web Apps (Parts 0 & 1)**  
This repository contains my solutions to **Part 0 and Part 1** of the [Full Stack Open](https://fullstackopen.com/en) course by the University of Helsinki. The exercises cover the fundamentals of modern web development using **React**, **JavaScript**, and **component-based design principles**.

---

## Completed Exercises

### Part 0 – Fundamentals of Web Apps

This part introduces the **client-server model**, basic **HTTP communication**, and how modern single-page applications (SPAs) behave compared to multi-page apps.

| Exercise | File               | Description |
|---------:|--------------------|-------------|
| 0.4      | `ex0.4_diagrams.md` | Sequence diagram of **adding a note** in a multi-page app |
| 0.5      | `ex0.5_diagrams.md` | Sequence diagram of **loading a SPA shell** |
| 0.6      | `ex0.6_diagrams.md` | Sequence diagram of **saving a note** inside a SPA |

---

### Part 1 – Introduction to React

This part focuses on building small applications using React, practicing component structure, passing props, handling state, and managing conditional rendering.

#### `courseinfo/` (Exercises 1.1 – 1.5)

| Exercise | Description |
|----------|-------------|
| 1.1      | Render static JSX containing course info and exercise count |
| 1.2      | Refactor to components: `Header`, `Content`, `Total` |
| 1.3      | Use JS objects to hold part data |
| 1.4      | Use array of objects for dynamic part rendering |
| 1.5      | Combine course name and parts into a single object |

#### `unicafe/` (Exercises 1.6 – 1.11)

| Exercise | Description |
|----------|-------------|
| 1.6      | Track feedback for Good, Neutral, and Bad using state |
| 1.7      | Compute total, average score, and positive percentage |
| 1.8      | Move statistics logic into its own `Statistics` component |
| 1.9      | Conditionally display "No feedback given" |
| 1.10     | Extract individual `StatisticLine` component |
| 1.11     | Render statistics in an HTML `<table>` layout |

#### `anecdotes/` (Exercises 1.12 – 1.14)

| Exercise | Description |
|----------|-------------|
| 1.12     | Display a random anecdote using state |
| 1.13     | Implement voting functionality for anecdotes |
| 1.14     | Show the anecdote with the most votes |

---

## Key Learnings

- **JSX & Component Structure**: Built reusable components using React and passed data via props.
- **State Handling with `useState`**: Managed application state like counters, selected anecdotes, and votes.
- **Conditional Rendering**: Displayed different UI outputs based on current state (e.g. "No feedback given").
- **Array Operations**: Used `.map()`, `Math.max()`, `.indexOf()`, and array copying techniques to handle lists of data and votes.
- **Semantic HTML**: Applied tags like `<table>`, `<tr>`, and `<td>` for layout clarity and accessibility.

---

## Technologies

- React (via Vite)
- JavaScript (ES6+)
- HTML/CSS
- Git & GitHub

---

### Part 2 – Communicating with Server
