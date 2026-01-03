const express = require('express');
const router = express.Router();
const { loginAdmin, verifyAdmin } = require('../controllers/adminController');
const { verifyToken } = require('../middleware/auth');

// POST /api/v1/admin/login - Admin login
router.post('/login', loginAdmin);

// GET /api/v1/admin/verify - Verify admin token
router.get('/verify', verifyToken, verifyAdmin);

module.exports = router;
