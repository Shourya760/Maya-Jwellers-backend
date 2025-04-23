import BlacklistedToken from '../models/blacklistedTokenModel.js'

export const checkBlacklistedToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied!' });
    }
    try {
        const blacklistedToken = await BlacklistedToken.findOne({ where: { token } });

        if (blacklistedToken) {
            return res.status(401).json({ message: 'Session Expired!' });
        }

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: 'Error while logging In', error });
    }
}