import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Import models
import User from './models/User.js'; 
import Task from './models/Task.js';

dotenv.config();

// Connect to the database
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected...');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  

const seedData = async () => {
    try {
      // Clear existing data (optional)
      await User.deleteMany();
      await Task.deleteMany();
  
      const user1 = new User({
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
      });
  
      const user2 = new User({
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 10),
      });
  
      const user3 = new User({
        email: 'alice.johnson@example.com',
        password: await bcrypt.hash('password123', 10),
      });
  
      // Save users
      await user1.save();
      await user2.save();
      await user3.save();
      console.log('Users created');
  
      // Create tasks for user1
      const task1 = new Task({
        title: 'Complete Task Management App',
        description: 'Finish all tasks for the app and test it.',
        status: 'Active',
        priority: 'High',
        creationDate: new Date(),
        user: user1._id,
      });
  
      const task2 = new Task({
        title: 'Code Review',
        description: 'Review code and suggest improvements.',
        status: 'Completed',
        priority: 'Medium',
        creationDate: new Date(),
        user: user1._id,
      });
  
      const task3 = new Task({
        title: 'Test User Registration',
        description: 'Ensure the user registration feature works correctly.',
        status: 'Active',
        priority: 'Low',
        creationDate: new Date(),
        user: user1._id,
      });
  
      // Create tasks for user2
      const task4 = new Task({
        title: 'Write Documentation',
        description: 'Document the API and usage of the task management app.',
        status: 'Completed',
        priority: 'Medium',
        creationDate: new Date(),
        user: user2._id,
      });
  
      const task5 = new Task({
        title: 'Test App Features',
        description: 'Test all features of the task management app.',
        status: 'Active',
        priority: 'Low',
        creationDate: new Date(),
        user: user2._id,
      });
  
      const task6 = new Task({
        title: 'Fix Bug in Task Creation',
        description: 'Fix the bug that prevents task creation from working.',
        status: 'Active',
        priority: 'High',
        creationDate: new Date(),
        user: user2._id,
      });
  
      // Create tasks for user3
      const task7 = new Task({
        title: 'Deploy the Application',
        description: 'Deploy the app to production environment.',
        status: 'Completed',
        priority: 'High',
        creationDate: new Date(),
        user: user3._id,
      });
  
      const task8 = new Task({
        title: 'Optimize Database Queries',
        description: 'Optimize the database queries for better performance.',
        status: 'Active',
        priority: 'Medium',
        creationDate: new Date(),
        user: user3._id,
      });
  
      const task9 = new Task({
        title: 'Create User Roles',
        description: 'Implement user roles and permissions.',
        status: 'Active',
        priority: 'Low',
        creationDate: new Date(),
        user: user3._id,
      });
  
      // Save tasks
      await task1.save();
      await task2.save();
      await task3.save();
      await task4.save();
      await task5.save();
      await task6.save();
      await task7.save();
      await task8.save();
      await task9.save();
  
      console.log('Tasks created');
  
      // Close the database connection
      mongoose.connection.close();
    } catch (error) {
      console.error('Error in seeding data:', error);
    }
}
  // Connect to DB and run the seed script
  connectDB().then(() => {
    seedData();
  });

