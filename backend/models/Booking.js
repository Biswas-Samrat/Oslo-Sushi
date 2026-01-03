const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    date: {
        type: Date,
        required: [true, 'Booking date is required']
    },
    time: {
        type: String,
        required: [true, 'Booking time is required'],
        trim: true
    },
    partySize: {
        type: Number,
        required: [true, 'Party size is required'],
        min: [1, 'Party size must be at least 1'],
        max: [50, 'Party size cannot exceed 50']
    },
    specialRequests: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Index for efficient querying
bookingSchema.index({ date: 1, time: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

// Virtual to check if booking is in the past
bookingSchema.virtual('isPast').get(function () {
    const bookingDateTime = new Date(this.date);
    const [hours, minutes] = this.time.split(':');
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes));
    return bookingDateTime < new Date();
});

bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema);
