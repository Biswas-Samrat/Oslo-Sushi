const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token for admin routes
 */
const verifyToken = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Authorization denied.'
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add admin info to request
        req.admin = {
            email: decoded.email,
            iat: decoded.iat,
            exp: decoded.exp
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please login again.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Authorization denied.'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error verifying token',
            error: error.message
        });
    }
};

module.exports = { verifyToken };
