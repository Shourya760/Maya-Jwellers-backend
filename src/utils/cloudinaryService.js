import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config(); // Make sure to load environment variables

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads an image file to Cloudinary and returns the URL.
 * @param {string} filePath - Path or URL of the image file.
 * @param {string} publicId - Optional: Specify public_id for Cloudinary.
 * @returns {Promise<string>} - Uploaded image URL.
 */
export const uploadToCloudinary = async (filePath, publicId = null) => {

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            public_id: publicId || undefined,
            folder: 'Maya-Jewellers', // Optional: You can customize the folder
        });
        await fs.unlink(filePath);
        return uploadResult.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        // ❗ Optional cleanup in case file exists and upload fails
        try {
            await fs.unlink(filePath);
        } catch (_) { }
        throw new Error('Image upload failed');
    }
};
