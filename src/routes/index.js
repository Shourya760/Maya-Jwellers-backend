import { Router } from 'express';
import userRouter from './userRoutes.js';
import categoryRouter from './categoryRoutes.js';



const router = Router();

// Import all your individual routes

// Combine all the routes
router.use('', userRouter);
router.use('/categories', categoryRouter);

// More routes can be added similarly

export default router;
