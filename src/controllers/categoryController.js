import { Op } from 'sequelize';
import Category from '../models/categoriesModel.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../utils/cloudinaryService.js'; // Assuming you have a utility function for Cloudinary upload
import { successResponse, errorResponse } from '../utils/response.js';

export const addCategory = async (req, res) => {
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
        res.status(201).json(successResponse('Category created successfully', newCategory));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to create category', error));
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json(errorResponse('Category name is required'));
        }
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json(errorResponse('Category not found'));
        }
        let imageUrl = category.image;
        console.log('Image URL:', imageUrl);
        if (req.file) {
            await deleteFromCloudinary(imageUrl); // Delete old image from Cloudinary
            // Upload new image to Cloudinary
            imageUrl = await uploadToCloudinary(req.file.path);
        }
        // Update category
        await category.update({
            name,
            image: imageUrl,
        });
        res.status(200).json(successResponse('Category updated successfully', category));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to update category', error));
    }
}

export const getCategories = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = '' } = req.query;

        if (!page || !limit || isNaN(page) || isNaN(limit)) {
            return res.status(400).json(errorResponse('Invalid page or limit value'));
        }

        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        const whereClause = search
            ? {
                name: {
                    [Op.like]: `%${search}%`,
                },
            }
            : {};
        const { count, rows: categories } = await Category.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['id', 'DESC']],
        });
        const totalPages = Math.ceil(count / limit);
        res.status(200).json(successResponse('Categories fetched successfully', {
            categories,
            pagination: {
                totalItems: count,
                currentPage: page,
                totalPages,
                pageSize: limit,
            },
        }));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch categories', error));
    }
};

export const getAllCategories = async (req, res) => {
    console.log('Fetching all categories');
    try {
        const categories = await Category.findAll({
            order: [['id', 'DESC']],
        });
        const totalCategories = categories.length;
        res.status(200).json(successResponse('All categories fetched successfully', { categories, totalCategories }));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch categories', error));
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json(errorResponse('Category not found'));
        }
        res.status(200).json(successResponse('Category fetched successfully', category));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch category', error));
    }
};

export const deleteCategory = async (req, res) => {
    // TODO: Need to be updated as Product will be mapped to category
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json(errorResponse('Category not found'));
        }
        await deleteFromCloudinary(category.image); // Delete image from Cloudinary
        await category.destroy();
        res.status(200).json(successResponse('Category deleted successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to delete category', error));
    }
};
