import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

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
        try {
            await fs.unlink(filePath);
        } catch (_) { }
        throw new Error('Image upload failed');
    }
};


/**
 * Deletes an image from Cloudinary using its full URL.
 * @param {string} imageUrl - The full URL of the image on Cloudinary.
 * @returns {Promise<void>}
 */
export const deleteFromCloudinary = async (imageUrl) => {
    try {
        // Extract public ID from the URL
        const parts = imageUrl.split('/');
        const fileName = parts[parts.length - 1]; // e.g. abc123.jpg
        const folder = parts[parts.length - 2];    // e.g. Maya-Jewellers
        const publicId = `${folder}/${path.parse(fileName).name}`; // e.g. Maya-Jewellers/abc123

        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image: ${publicId}`);
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
        throw new Error('Image deletion failed');
    }
};