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

        // Send WhatsApp Notification via Twilio
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;

            if (accountSid && authToken) {
                const client = require('twilio')(accountSid, authToken);

                // Format the message
                const messageBody = `*New Table Booking!*

-----------------
*Name:* ${booking.name}
*Phone:* ${booking.phone}
*Date:* ${new Date(booking.date).toLocaleDateString()}
*Time:* ${booking.time}
*Guests:* ${booking.partySize}
*Email:* ${booking.email || 'N/A'}
*Special Requests:* ${booking.specialRequests || 'None'}`;

                await client.messages.create({
                    from: 'whatsapp:+14155238886', // Twilio Sandbox Number
                    to: 'whatsapp:+8801882746498',  // Admin Number
                    body: messageBody
                });

                console.log('WhatsApp notification sent successfully');
            } else {
                console.log('Twilio credentials missing - skipping WhatsApp notification');
                console.log('Would have sent:', booking);
            }
        } catch (twilioError) {
            console.error('Failed to send WhatsApp notification:', twilioError.message);
            // Don't fail the request if notification fails, just log it
        }

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
