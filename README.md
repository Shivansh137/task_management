# Task Management Application

A simple task management application that allows users to manage their tasks, mark them as completed, and delete them. The application has a backend built with Node.js, Express, and MongoDB, and a frontend built with React.

## Features
- User authentication (register/login).
- Create, update, and delete tasks.
- Mark tasks as completed.
- Filter tasks based on their status (Active/Completed).
- Responsive UI built with React.

## Setup Instructions

### Backend

1. Clone the repository:
   ```bash
   
   git clone https://github.com/Shivansh137/task_management.git
   cd task_management
   
2. Navigate to the server folder:
   ```bash
   
   cd server
   
3. Install the required dependencies:
   ```bash
   
   npm install
   
4. Create a .env file in the server directory and add the following variables:
   ```bash
   
   MONGO_URI=<your-mongo-uri-here>
   ACCESS_TOKEN_SECRET=<your-jwt-secret-here>
   REFRESH_TOKEN_SECRET=<your-jwt-secret-here>

* Replace placeholders with your actual values when setting up the project.
5. Run seed.js to store seed data for testing:
   ```bash
   node seed
   
6. Start the backend server:
   ```bash
   
   node app

### Frontend
1. Navigate to the client folder
   ```bash
   cd ..
   cd client
2. Install the required dependencies:
   ```bash
   
   npm install
   
3. Start the frontend server:
   ```bash
   
   npm run dev
---

## Tech Stack

### Backend:
- **Node.js**: JavaScript runtime to run the backend.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **MongoDB**: NoSQL database to store user and task data.
- **JWT (JSON Web Tokens)**: For user authentication and securing API routes.
- **Mongoose**: ORM to interact with MongoDB.
  
### Frontend:
- **React**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework to style the app.

---

### Database Schema Description
User Schema
- email (String, unique): User's email address.
- password (String): Encrypted password.

Task Schema
- title (String): Title of the task.
- description (String): Detailed description of the task.
- status (String): Task status (Active, Completed).
- priority (String): Priority of the task (Low, Medium, High).
- createdAt (Date): Date the task was created.
- user (ObjectId): Reference to the user who created the task.

--- 

### How to Run the Application Locally

1. Clone the repository and install dependencies (as mentioned above).
2. Ensure MongoDB is running locally or use MongoDB Atlas.
3. Set up the .env file.
4. Run seed.js file to store seed data in database.
5. Start the backend server using node app in the server directory.
6. Start the frontend server using npm run dev in the client directory.
7. Visit http://localhost:5173 in your browser to access the app.


