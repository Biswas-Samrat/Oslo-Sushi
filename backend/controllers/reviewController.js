const Review = require('../models/Review');

/**
 * Submit new review (Public)
 */
const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Thank you for your review!',
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error submitting review',
            error: error.message
        });
    }
};

/**
 * Get all approved reviews (Public)
 * Admin can see all reviews
 */
const getAllReviews = async (req, res) => {
    try {
        const { featured, approved } = req.query;

        let filter = {};

        // If not admin request (no auth token), only show approved reviews
        if (!req.admin) {
            filter.approved = true;
        } else {
            // Admin can filter by approved status
            if (approved !== undefined) filter.approved = approved === 'true';
        }

        if (featured !== undefined) filter.featured = featured === 'true';

        const reviews = await Review.find(filter).sort({ featured: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error.message
        });
    }
};

/**
 * Toggle featured status (Admin)
 */
const toggleFeatured = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        review.featured = !review.featured;
        await review.save();

        res.status(200).json({
            success: true,
            message: `Review ${review.featured ? 'featured' : 'unfeatured'} successfully`,
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating review',
            error: error.message
        });
    }
};

/**
 * Delete review (Admin)
 */
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
            data: { id: req.params.id }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting review',
            error: error.message
        });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    toggleFeatured,
    deleteReview
};
