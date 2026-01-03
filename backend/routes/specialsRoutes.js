const express = require('express');
const router = express.Router();
const {
    getActiveSpecials,
    getAllSpecials,
    createSpecials,
    updateSpecial,
    stopSpecial,
    deleteSpecial,
    restoreSpecial
} = require('../controllers/specialsController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/active', getActiveSpecials);

// Admin routes (protected)
router.get('/', verifyToken, getAllSpecials);
router.post('/', verifyToken, createSpecials);
router.put('/:id', verifyToken, updateSpecial);
router.post('/:id/stop', verifyToken, stopSpecial);
router.post('/:id/restore', verifyToken, restoreSpecial);
router.delete('/:id', verifyToken, deleteSpecial);

module.exports = router;
