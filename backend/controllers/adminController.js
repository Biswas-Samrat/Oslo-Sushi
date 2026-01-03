const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Admin login controller
 * Compares credentials against values stored in .env
 * Returns JWT token on success
 */
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Check if email matches
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare password with hashed password in .env
        const isPasswordValid = await bcrypt.compare(
            password,
            process.env.ADMIN_PW_HASH
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token (8 hour expiry)
        const token = jwt.sign(
            { email: email },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                email: email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
};

/**
 * Verify admin token (for protected route checks)
 */
const verifyAdmin = async (req, res) => {
    try {
        // Token already verified by middleware
        res.status(200).json({
            success: true,
            admin: {
                email: req.admin.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying admin',
            error: error.message
        });
    }
};

module.exports = {
    loginAdmin,
    verifyAdmin
};
