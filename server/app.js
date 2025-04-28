import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/dbConn.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import corsOptions from './config/corsOptions.js';
import cookieParser from 'cookie-parser';

// Initialize app
const app = express();
dotenv.config();

// Connect Database
connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON body
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
