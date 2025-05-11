import Category from '../models/categoriesModel.js';
import { uploadToCloudinary } from '../utils/cloudinaryService.js'; // Assuming you have a utility function for Cloudinary upload
import { successResponse, errorResponse } from '../utils/response.js';

export const addCategory = async (req, res) => {
    try {        
        const { name } = req.body;
        const image = req.file.path; // Assuming you're using multer for file uploads
        if (!name) {
            return res.status(400).json(errorResponse('Category name is required'));
        }   
        let imageUrl = null;
        if (image) {
            // Upload image to Cloudinary
            imageUrl = await uploadToCloudinary(image);
        }
        // Create new category
        const newCategory = await Category.create({
            name,
            image: imageUrl,
        });
        res.status(201).json(successResponse(newCategory, 'Category created successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to create category', error));
    }
}