import express from 'express';
import multer from 'multer';
import { addCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { checkBlacklistedToken } from '../middlewares/checkBlacklistedMiddleware.js';
const upload = multer({ dest: 'uploads/' }); // temp storage

const categoryRouter = express.Router();

categoryRouter.post('', authenticate, checkBlacklistedToken, upload.single('image'), addCategory)

export default categoryRouter;  