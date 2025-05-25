import express from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/usersController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { checkBlacklistedToken } from '../middlewares/checkBlacklistedMiddleware.js';

const userRouter = express.Router();

// User registration route
userRouter.post('/register', registerUser);

// User login route
userRouter.post('/login', loginUser);

// User logout route
userRouter.post('/logout', authenticate, checkBlacklistedToken, logoutUser);

// Get current user route
userRouter.get('/user', authenticate, checkBlacklistedToken, getCurrentUser);

export default userRouter;