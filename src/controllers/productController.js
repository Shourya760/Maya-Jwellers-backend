import Product from "../models/productModel.js";
import ProductToCategories from "../models/productToCategoriesModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryService.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { productValidateSchema } from "../utils/SchemaValidations.js";
import Image from "../models/imagesModel.js";
import sequelize from "../config/db.js";


export const addProduct = async (req, res) => {

    const { error } = productValidateSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const allMessages = error.details.map(detail => detail.message);
        return res.status(400).json(errorResponse("Validation error", allMessages));
    }
    if (!req.files || req.files.length === 0) {
        return res.status(400).json(errorResponse("No files uploaded. Please upload at least one image."));
    }
    for (const file of req.files) {
        if (file.size > 10 * 1024 * 1024) {
            return res.status(400).json(errorResponse(`${file.originalname} exceeds the 10MB limit.`));
        }
    }

    const t = await sequelize.transaction();
    try {
        const {
            name,
            description,
            type,
            ornament_type,
            price,
            weight,
            carat,
            handmade_or_resale,
            age_group,
            gender,
            holy_or_ceremonial,
            categories,
            is_disable
        } = req.body;
        const images = req.files;

        if (!name || !price || !categories || !images) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const savedProduct = await Product.create({
            name,
            description,
            type,
            ornament_type,
            price,
            weight,
            carat,
            handmade_or_resale,
            age_group,
            gender,
            holy_or_ceremonial,
            is_disable
        }, { transaction: t });

        const uploadPromises = images.map(async (image) => {
            const imageUrl = await uploadToCloudinary(image.path);
            const imageRecord = await Image.create(
                {
                    image_url: imageUrl,
                    product_id: savedProduct.id,
                },
                { transaction: t }
            );
            return { imageUrl, imageId: imageRecord.id };
        });
        const uploadedResults = await Promise.all(uploadPromises);

        await ProductToCategories.bulkCreate(
            categories.map(category_id => ({
                product_id: savedProduct.id,
                categories_id: category_id
            })),
            { transaction: t }
        );

        await t.commit();
        return res.status(201).json(successResponse("Product created successfully", {
            product: savedProduct
        }));
    } catch (error) {
        await t.rollback();
        console.log("An Error Occurred: ", error);
        return res.status(500).json(errorResponse("Failed to create product", error));
    }
};


// export const getProducts = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, search = '' } = req.query;

//         if (!page || !limit || isNaN(page) || isNaN(limit)) {
//             return res.status(400).json(errorResponse('Invalid page or limit value'));
//         }

//         const offset = (page - 1) * limit;
//         const whereClause = search ? {
//             name: {
//                 [sequelize.Op.like]: `%${search}%`
//             }
//         } : {};

//         const { count, rows } = await Product.findAndCountAll({
//             where: whereClause,
//             limit: parseInt(limit),
//             offset: parseInt(offset),
//             include: [{
//                 model: Image,
//                 as: 'images'
//             }],
//             order: [['createdAt', 'DESC']]
//         });
        

//         return res.status(200).json(successResponse('Products retrieved successfully', {
//             products: rows,
//             totalCount: count,
//             totalPages: Math.ceil(count / limit),
//             currentPage: parseInt(page)
//         }));
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return res.status(500).json(errorResponse('Failed to fetch products', error));
//     }
// }