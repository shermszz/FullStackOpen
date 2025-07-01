# Exercise 3.11: Full Stack Phonebook

This exercise extends exercise 3.10 by adding a production build of the frontend and ensuring proper functionality in both production and development environments. (Most of which are already done in exercise 3.10)

## Online Application

The application is deployed at: https://renderbackenddeployment.onrender.com

## Key Implementations

1. **Production Build Integration**
   - Frontend production build is added to the backend
   - The `dist` directory is properly tracked by git (not ignored)
   - Backend serves static files from the `dist` directory

2. **Backend Endpoints**
   - GET `/api/persons`: Fetch all persons
   - POST `/api/persons`: Add new person
   - DELETE `/api/persons/:id`: Remove a person
   - PUT `/api/persons/:id`: Update a person's number (Added in ex3.11)

3. **Development Mode**
   - Frontend still works locally with `npm run dev`
   - Proxy configuration in Vite handles API requests in development

## Project Structure
```
ex3.10/
├── frontend/         # React frontend application
├── backend/          # Express backend application
└── README.md        # This file
```

## Deployment Process

This project uses custom npm scripts to streamline the build and deployment process. The scripts are defined in `backend/package.json`:

```json
{
  "scripts": {
    "build:ui": "rm -rf dist && cd ../frontend/ && npm run build && cp -r dist ../backend",
    "copyToRenderBackendDeployment": "rm -rf ../../../../../RenderBackendDeployment/dist && cp -r dist ../../../../../RenderBackendDeployment/"
  }
}
```

### How to Use the Scripts

1. **Build the Frontend and Copy to Backend**
   ```bash
   cd backend
   npm run build:ui
   ```
   This command will:
   - Remove any existing dist folder in backend
   - Navigate to frontend directory
   - Build the React application
   - Copy the built files (dist folder) to backend

2. **Copy to Deployment Repository**
   ```bash
   npm run copyToRenderBackendDeployment
   ```
   This command will:
   - Remove any existing dist folder in RenderBackendDeployment (This is the name of my deployment repository)
   - Copy the new dist folder to RenderBackendDeployment

3. **Complete Deployment**
   After running these scripts, redirect your terminal to your deployment repository, then do the following:
   ```bash
   git add .
   git commit -m "Update frontend build then deploy"
   git push
   ```
   Render will automatically deploy the new version, if not you should manually deploy your latest commit

## Features

- List all persons in the phonebook
- Add new persons with name and number
- Delete persons
- Update existing person's number (Fixed the update of phone number if names are the same in this exercise by adding a app.put() in my index.js file that I did not do in exercise 3.10)
- Input validation
- Error handling

## Development

To run locally:
1. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

The frontend will run on port 5173 and the backend on port 3001.