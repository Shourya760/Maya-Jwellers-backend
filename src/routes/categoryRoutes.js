import express from 'express';
import multer from 'multer';
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { checkBlacklistedToken } from '../middlewares/checkBlacklistedMiddleware.js';
const upload = multer({ dest: 'uploads/' }); // temp storage

const categoryRouter = express.Router();

categoryRouter.post('', authenticate, checkBlacklistedToken, upload.single('image'), addCategory)

categoryRouter.get('', authenticate, checkBlacklistedToken, upload.single('image'), getCategories)

categoryRouter.put('/:id', authenticate, checkBlacklistedToken, upload.single('image'), updateCategory)

categoryRouter.get('/:id', authenticate, checkBlacklistedToken, getCategoryById)

categoryRouter.delete('/:id', authenticate, checkBlacklistedToken, deleteCategory) // Uncomment if you have a delete function

export default categoryRouter;  