# 📚 Full Stack Open  
**Fundamentals of Web Apps (Parts 0–4)** This repository contains my solutions to **Parts 0, 1, 2, 3, and 4** of the [Full Stack Open](https://fullstackopen.com/en) course by the University of Helsinki. The exercises cover the fundamentals of modern web development using **React**, **JavaScript**, **Node.js**, **Express**, **MongoDB**, **Jest**, and **component-based design principles**.

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

### Part 3 – Programming a Server with NodeJS and Express

This part focuses on implementing a backend server using Node.js and Express, connecting to MongoDB, and deploying a full-stack application.

#### `Part3a/` (Exercises 3.1 – 3.8)

| Exercise | Description |
|----------|-------------|
| 3.1      | Implement backend for phonebook with Express |
| 3.2      | Implement info page showing request time and entry count |
| 3.3      | Implement route for fetching single phonebook entry |
| 3.4      | Implement functionality for deleting entries |
| 3.5      | Add functionality for adding new entries |
| 3.6      | Add error handling for invalid/duplicate entries |
| 3.7      | Add morgan middleware for logging |
| 3.8      | Configure morgan to log POST request data |

#### `Part3b/` (Exercises 3.9 – 3.11)

| Exercise | Description |
|----------|-------------|
| 3.9      | Connect frontend to backend |
| 3.10     | Deploy backend to internet |
| 3.11     | Deploy full stack app to internet |

#### `Part3c/` (Exercises 3.12 – 3.18)

| Exercise | Description |
|----------|-------------|
| 3.12     | Create command-line MongoDB database |
| 3.13-14  | Change backend to use MongoDB |
| 3.15     | Add delete functionality with database |
| 3.16     | Add error handling middleware |
| 3.17     | Add update functionality for phone numbers |
| 3.18     | Enhance single person and info routes |

#### `Part3d/` (Exercises 3.19 – 3.22)

| Exercise | Description |
|----------|-------------|
| 3.19     | Add validation to prevent invalid numbers |
| 3.20     | Add validation for name and number format |
| 3.21     | Deploy database backend to production |
| 3.22     | Add ESLint configuration for code quality |

---

### Part 4 – Testing Express Servers, User Administration

This part focuses on automated testing, user authentication, and structuring backend applications for scalability. It includes unit testing with **Jest**, integration testing with **Supertest**, and implementing **Token-based Authentication**.

#### `Part4a/` (Exercises 4.1 – 4.7)

| Exercise | Description |
|----------|-------------|
| 4.1      | Initialise Blog List application structure |
| 4.2      | Refactor app into modules (controllers, models, utils) |
| 4.3      | Create dummy unit tests with Jest |
| 4.4      | Implement `totalLikes` helper and unit tests |
| 4.5      | Implement `favoriteBlog` helper and unit tests |
| 4.6      | Implement `mostBlogs` author helper using Lodash |
| 4.7      | Implement `mostLikes` author helper using Lodash |

#### `Part4b/` (Exercises 4.8 – 4.14)

| Exercise | Description |
|----------|-------------|
| 4.8      | Integration test for GET /api/blogs using Supertest |
| 4.9      | Verify `id` property existence in JSON response |
| 4.10     | Integration test for POST /api/blogs (creating new blog) |
| 4.11     | Verify `likes` defaults to 0 if missing |
| 4.12     | Verify 400 Bad Request if title/url missing |
| 4.13     | Implement and test DELETE functionality |
| 4.14     | Implement and test PUT (update) functionality |

#### `Part4d/` (Exercises 4.15 – 4.23)

| Exercise | Description |
|----------|-------------|
| 4.15     | Implement User model, controller, and password hashing |
| 4.16     | Add validation for username/password length and uniqueness |
| 4.17     | Link Blogs to Users (Population logic) |
| 4.18     | Implement token-based login functionality |
| 4.19     | Protect blog creation route (Token required) |
| 4.20     | Refactor token extraction into middleware |
| 4.21     | Ensure only the creator can delete a blog |
| 4.22     | Implement user extraction middleware |
| 4.23     | Finalize tests for token validation and missing headers |

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
- **Backend Development**: Built RESTful APIs using Node.js and Express.
- **Database Integration**: Connected application to MongoDB using Mongoose.
- **Deployment**: Deployed full-stack application to production using Render.
- **Code Quality**: Implemented ESLint for consistent code style and error checking.
- **Backend Testing**: Wrote unit and integration tests using **Jest** and **Supertest** to automate API verification.
- **Authentication**: Implemented secure password storage using **bcrypt** and token-based authentication using **JSON Web Tokens (JWT)**.
- **Middleware**: Created custom middleware for request logging, error handling, and token/user extraction.

---

## Technologies

- React (via Vite)
- JavaScript (ES6+)
- HTML/CSS
- Node.js
- Express
- MongoDB & Mongoose
- Git & GitHub
- JSON Server
- Axios
- REST APIs
- ESLint
- Render (Deployment)
- Jest (Testing Framework)
- Supertest (HTTP Assertions)
- Bcrypt (Password Hashing)
- JSON Web Token (Authentication)