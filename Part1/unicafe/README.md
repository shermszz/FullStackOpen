# 📊 Unicafe Feedback App (Exercises 1.6 – 1.11)

This is a simple React application built as part of the [Full Stack Open](https://fullstackopen.com/en/) course offered by the University of Helsinki. It simulates a feedback system for a fictional university café called **Unicafe**. The app demonstrates fundamental React concepts such as component decomposition, state handling, conditional rendering, and rendering structured data using HTML tables.

---

## What It Does

Users can give feedback in three categories:

- **Good**
- **Neutral**
- **Bad**

The app then displays:

- Count of each feedback type
- Total number of feedbacks
- Average score
- Percentage of positive feedback

---

## Concepts Covered

| Exercise | Description |
|----------|-------------|
| **1.6**  | Collect and display the number of good, neutral, and bad feedbacks |
| **1.7**  | Add total count, average score, and positive percentage |
| **1.8**  | Extract `Statistics` into its own component |
| **1.9**  | Conditionally show `"No feedback given"` if total is 0 |
| **1.10** | Extract each line into a reusable `StatisticLine` component |
| **1.11** | Display all statistics inside an HTML `<table>` for better layout |

---

## Technologies Used

- React (via Vite)
- JavaScript (ES6+)
- HTML

---

## How to Run

```bash
npm install
npm run dev