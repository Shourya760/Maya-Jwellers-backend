import { verifyToken } from "../utils/jwtUtils.js";
import { errorResponse } from "../utils/response.js";

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json(errorResponse('Authentication token is missing!'));
    }
    try {
        const decoded = verifyToken(token);  // Decode and verify token
        req.user = decoded;  // Attach user info to the request
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json(errorResponse('Token is not valid!', error.message));
    }
};

