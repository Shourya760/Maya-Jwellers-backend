import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils.js';
import User from '../models/userModel.js'
import BlacklistedToken from '../models/blacklistedTokenModel.js';
import { successResponse,errorResponse } from '../utils/response.js';

// Register user
export const registerUser = async (req, res) => {
    console.log("debug 1")
    const { name, email, phone, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }
        const newUser = await User.create({ name, email, phone, password });
        const token = generateToken(newUser);
        res.status(201).json({
            message: 'User registered successfully!',
            token, // Send the token to the client
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user!', error });
    }
};

// Login user
export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.unscoped().findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }
        const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }
        const token = generateToken(user);

        res.status(200).json(
            successResponse('User logged in successfully!', {
                token,
                user: user
            })
        );
    } catch (error) {
        res.status(500).json(errorResponse('Error logging in user!', error.message));
    }
};

// Logout User 
export const logoutUser = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }
        // Decode the token to get expiration (optional)
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const expiryDate = new Date(decoded.exp * 1000); // Convert exp (seconds) to milliseconds
        // Store in DB
        await BlacklistedToken.create({ token, expiryDate });
        res.status(200).json(
            successResponse('User logged out and token blacklisted!')
        );
    } catch (error) {
        res.status(500).json({ message: 'Error logging out user!', error });
    }
};


// Get Single User
export const getCurrentUser = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const { id, email, name } = decoded;
        // Since both id and email (or name) are unique, we can search using id.
        const user = await User.findOne({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json(
            successResponse('User logged in successfully!', {
                user
            })
        );
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user!', error });
    }
};