import express from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/usersController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { checkBlacklistedToken } from '../middlewares/checkBlacklistedMiddleware.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.post('/logout', authenticate, checkBlacklistedToken, logoutUser);

// Get current user route
router.get('/user', getCurrentUser);

export default router;