# Anecdotes App – Full Stack Open (Exercises 1.12–1.14)

This folder contains my solutions to exercises 1.12 to 1.14 of the [Full Stack Open](https://fullstackopen.com/en/part1) course offered by the University of Helsinki. The application randomly displays software engineering anecdotes and allows users to vote for their favorite ones.

## Exercises

### 1.12: Anecdotes step 1

**Task:** Add a button that when clicked displays a random anecdote from the list.

**What I did:**
- Used `Math.random()` and `Math.floor()` to generate a random index from the anecdotes array.
- Created a state variable `selected` using `useState` to keep track of the currently displayed anecdote.
- Displayed the anecdote using `anecdotes[selected]`.

---

### 1.13: Anecdotes step 2

**Task:** Add voting functionality to each anecdote.

**What I did:**
- Added a `votes` array using `useState`, initialized with zeros.
- Created a `vote()` function that copies the array, increments the selected anecdote's vote count, and updates the state.
- Displayed the number of votes for the currently selected anecdote.

---

### 1.14: Anecdotes step 3

**Task:** Display the anecdote with the highest number of votes.

**What I did:**
- Found the index of the anecdote with the most votes using `Math.max()` and `indexOf()`.
- Displayed this anecdote below the current one under a new section titled **"Anecdote with most votes"**.
- Added a reusable `Header` component for section titles.

---

---

## Technologies Used

- React (via Vite)
- JavaScript (ES6+)
- HTML

---

## Key Learnings

- Managing arrays in React state using `useState`.
- Copying and updating arrays immutably using the spread operator (`...`).
- Dynamically rendering content based on computed state values.
