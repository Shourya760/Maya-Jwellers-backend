import { Router } from 'express';
import userRouter from './userRoutes.js';
import categoryRouter from './categoryRoutes.js';
import prouductRouter from './productRoutes.js';



const router = Router();

// Import all your individual routes

// Combine all the routes
router.use('', userRouter);
router.use('/categories', categoryRouter);
router.use('/product',prouductRouter)
// More routes can be added similarly

export default router;
