# 📚 Full Stack Open  
**Fundamentals of Web Apps (Parts 0, 1 & 2)**  
This repository contains my solutions to **Parts 0, 1, and 2** of the [Full Stack Open](https://fullstackopen.com/en) course by the University of Helsinki. The exercises cover the fundamentals of modern web development using **React**, **JavaScript**, **component-based design principles**, and **server communication**.

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

### Part 2 – Communicating with Server

This part focuses on rendering data collections, handling forms, communicating with a backend server using REST APIs, applying styles to React applications, and working with external APIs.

#### `Part2a/` (Exercises 2.1 – 2.5)

| Exercise | Description |
|----------|-------------|
| 2.1      | Refactor Course component to handle an arbitrary number of courses |
| 2.2      | Calculate sum of exercises using array methods |
| 2.3      | Use reduce method for exercise calculation |
| 2.4      | Handle arbitrary number of courses |
| 2.5      | Separate Course into its own module |

#### `Part2b/` (Exercises 2.6 – 2.10)

| Exercise | Description |
|----------|-------------|
| 2.6      | Create phonebook form for adding names |
| 2.7      | Prevent duplicate name entries |
| 2.8      | Extend phonebook with phone numbers |
| 2.9      | Add search filter for phonebook entries |
| 2.10     | Refactor into components: `Filter`, `PersonForm`, `Persons` |

#### `Part2c-d/` (Exercises 2.11 – 2.15)

| Exercise | Description |
|----------|-------------|
| 2.11     | Load initial phonebook data from server |
| 2.12     | Create backend connection for adding entries |
| 2.13     | Extract communication logic into a service module |
| 2.14     | Add functionality to delete entries |
| 2.15     | Update existing phonebook entries |

#### `Part2e/` (Exercises 2.16 – 2.20)

| Exercise | Description |
|----------|-------------|
| 2.16     | Add success/error notifications for user actions |
| 2.17     | Show error message for deleted entries |
| 2.18     | Create country search with REST Countries API |
| 2.19     | Add weather data for selected country |
| 2.20     | Implement country data caching |

---

## Key Learnings

- **JSX & Component Structure**: Built reusable components using React and passed data via props.
- **State Handling with `useState`**: Managed application state like counters, selected anecdotes, and votes.
- **Conditional Rendering**: Displayed different UI outputs based on current state (e.g. "No feedback given").
- **Array Operations**: Used `.map()`, `Math.max()`, `.indexOf()`, and array copying techniques to handle lists of data and votes.
- **Semantic HTML**: Applied tags like `<table>`, `<tr>`, and `<td>` for layout clarity and accessibility.
- **Server Communication**: Implemented CRUD operations using `axios` and REST APIs.
- **Error Handling**: Added user notifications and error messages for better UX.
- **External APIs**: Integrated with REST Countries API and weather services.
- **Module Structure**: Organized code into reusable services and components.

---

## Technologies

- React (via Vite)
- JavaScript (ES6+)
- HTML/CSS
- Git & GitHub
- JSON Server
- Axios
- REST APIs
