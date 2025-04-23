import { Router } from 'express';
import userRoutes from './userRoutes.js';



const router = Router();

// Import all your individual routes

// Combine all the routes
router.use('', userRoutes);

router.get('/test', (req, res) => {
    res.status(200).json({ message: "Test route working" });
});
// More routes can be added similarly

export default router;
