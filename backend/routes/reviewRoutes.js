const express = require('express');
const router = express.Router();
const {
    createReview,
    getAllReviews,
    toggleFeatured,
    deleteReview
} = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/', createReview);
router.get('/', getAllReviews);

// Admin routes (protected)
router.put('/:id/feature', verifyToken, toggleFeatured);
router.delete('/:id', verifyToken, deleteReview);

module.exports = router;
