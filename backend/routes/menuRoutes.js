const express = require('express');
const router = express.Router();
const {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menuController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);

// Admin routes (protected)
router.post('/', verifyToken, createMenuItem);
router.put('/:id', verifyToken, updateMenuItem);
router.delete('/:id', verifyToken, deleteMenuItem);

module.exports = router;
