import express from 'express';
// import { authenticate } from '../middlewares/authMiddleware.js';
// import { checkBlacklistedToken } from '../middlewares/checkBlacklistedMiddleware.js';
import { addProduct } from '../controllers/productController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // temp storage

const prouductRouter = express.Router();

// Route for Product Creation
prouductRouter.post('',upload.array('images', 5),addProduct)

// Route for Product update
// prouductRouter.put('',authenticate,checkBlacklistedToken,updateProduct)

// // Route for Product Deletion
// prouductRouter.delete('',authenticate,checkBlacklistedToken,deleteProduct)

// // Route for fetching single Products
// prouductRouter.get('/:id',getProduct)

// // Route for fetching all the products
// prouductRouter.get('',getAllProducts)

export default prouductRouter