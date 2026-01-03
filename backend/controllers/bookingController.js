const Booking = require('../models/Booking');

/**
 * Create new booking (Public)
 */
const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully. We will contact you soon to confirm.',
            data: booking
        });

        // TODO: Send confirmation email here (optional)
        // sendBookingConfirmation(booking);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
};

/**
 * Get all bookings (Admin)
 */
const getAllBookings = async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;

        let filter = {};
        if (status) filter.status = status;
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const bookings = await Booking.find(filter).sort({ date: -1, time: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
};

/**
 * Update booking status (Admin)
 */
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `Booking ${status} successfully`,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating booking',
            error: error.message
        });
    }
};

/**
 * Delete booking (Admin)
 */
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
            data: { id: req.params.id }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting booking',
            error: error.message
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    deleteBooking
};
