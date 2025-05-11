import Category from '../models/categoriesModel.js';
import { uploadToCloudinary } from '../utils/cloudinaryService.js'; // Assuming you have a utility function for Cloudinary upload
import { successResponse, errorResponse } from '../utils/response.js';

export const addCategory = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json(errorResponse('Category name is required'));
        }
        let imageUrl = null;
        if (req.file) {
            // Upload image to Cloudinary
            imageUrl = await uploadToCloudinary(req.file.path);
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