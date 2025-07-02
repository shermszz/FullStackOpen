# Exercise 3.12 – Phonebook MongoDB Setup

## Implementation Note
This implementation differs from the course material by using environment variables (`.env`) for MongoDB credentials instead of command-line arguments. This approach follows security best practices by avoiding exposure of sensitive information in command-line history or code.

## Prerequisites
1. MongoDB Atlas account and cluster setup
2. Node.js installed
3. npm packages: `mongoose`, `dotenv`

## Setup Instructions

1. Create a `.env` file in the `backend/` directory with your MongoDB credentials:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/phonebook?retryWrites=true&w=majority&appName=<clusterName>

2. Replace the placeholders:
   - `<username>`: Your MongoDB Atlas username
   - `<password>`: Your MongoDB Atlas password
   - `<your-cluster-url>`: Your cluster's URL (e.g., cluster0.abc123.mongodb.net)
   - `<clusterName>`: Your cluster name on MongoDB Atlas

> **Security Note**: The `.env` file is included in `.gitignore` to prevent credentials from being committed to version control.

## Usage

### View all entries
```bash
node mongo.js
```
This will display all entries in your phonebook:
```
phonebook:
Ada Lovelace 39-44-5323523
...
```

### Add a new entry
```bash
node mongo.js "Ada Lovelace" "39-44-5323523"
```
Expected output:
```
added Ada Lovelace number 39-44-5323523 to phonebook
```

## Technical Notes
- Phone numbers are stored as strings to preserve formatting (hyphens, leading zeros)
- MongoDB collections and documents are created automatically on first insert
- Environment variables are loaded using the `dotenv` package
- The implementation follows security best practices by keeping sensitive data out of the codebase
