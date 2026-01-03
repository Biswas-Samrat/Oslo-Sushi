const express = require('express');
const router = express.Router();
const {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    deleteBooking
} = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/', createBooking);

// Admin routes (protected)
router.get('/', verifyToken, getAllBookings);
router.put('/:id', verifyToken, updateBookingStatus);
router.delete('/:id', verifyToken, deleteBooking);

module.exports = router;
