# Full Stack Open 2024 - Part 3 Exercise 3.21

## Phonebook Full Stack

This repository contains the solution for exercise 3.21 of the Full Stack Open course. The exercise demonstrates a full stack phonebook application with the backend deployed to the cloud.

### Online Application

The application is deployed and can be accessed at: 
https://renderbackenddeployment.onrender.com/ 

### Features Implemented
- Backend API built with Node.js and Express
- MongoDB database integration
- Data validation for both name and phone number fields
- Error handling for various scenarios
- Frontend built with React (production build integrated with backend)

### API Endpoints
- GET `/api/persons` - Get all persons
- GET `/api/persons/:id` - Get a specific person
- POST `/api/persons` - Add a new person
- PUT `/api/persons/:id` - Update a person
- DELETE `/api/persons/:id` - Delete a person
- GET `/info` - Display information about the phonebook

### Local Development
To run this application locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your MongoDB URL:
   ```
   MONGODB_URL=your_mongodb_url
   PORT=3001
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Access the application at `http://localhost:3001`

### Notes
- This deployment is specifically for Part 3 Exercise 3.21
- The frontend is built and served through the backend
- All validation requirements from previous exercises are maintained
- The application uses MongoDB Atlas for data persistence
