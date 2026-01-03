const mongoose = require('mongoose');

const specialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Special title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        min: [0, 'Price cannot be negative']
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    },
    tags: [{
        type: String,
        trim: true
    }],
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    startTime: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'stopped', 'expired', 'history'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Index for efficient querying
specialSchema.index({ status: 1, endDate: 1 });
specialSchema.index({ startDate: 1, endDate: 1 });

// Virtual for checking if special is currently active
specialSchema.virtual('isActive').get(function () {
    const now = new Date();
    return this.status === 'active' &&
        this.startDate <= now &&
        this.endDate >= now;
});

// Virtual for discounted price
specialSchema.virtual('discountedPrice').get(function () {
    if (this.discount > 0 && this.price) {
        return this.price * (1 - this.discount / 100);
    }
    return this.price;
});

// Pre-save hook to validate dates
specialSchema.pre('save', function (next) {
    if (this.endDate < this.startDate) {
        next(new Error('End date must be after start date'));
    }
    next();
});

specialSchema.set('toJSON', { virtuals: true });
specialSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Special', specialSchema);
