import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


// Generate JWT Token
export const generateToken = (user) => {
    return jsonwebtoken.sign(
        { id: user.id, email: user.email, name: user.name },  // Payload
        process.env.JWT_SECRET,              // Secret key
        { expiresIn: process.env.JWT_EXPIRATION } // Expiration time
    );
};

// Verify JWT Token
export const verifyToken = (token) => {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};

