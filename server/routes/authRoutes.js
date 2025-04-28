import express from 'express';
import { registerUser, loginUser, refresh, logout } from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login an existing user
router.post('/login', loginUser);

// Refresh access token
router.get('/refresh', refresh);

// Logout
router.get('/logout', logout);

export default router;
