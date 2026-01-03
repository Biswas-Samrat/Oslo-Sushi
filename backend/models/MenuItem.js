const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Menu item name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['Starters', 'Mains', 'Desserts', 'Kids', 'Drinks', 'Other'],
        default: 'Other'
    },
    imageUrl: {
        type: String,
        default: ''
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    },
    localFavorite: {
        type: Boolean,
        default: false
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual for discounted price
menuItemSchema.virtual('discountedPrice').get(function () {
    if (this.discount > 0) {
        return this.price * (1 - this.discount / 100);
    }
    return this.price;
});

// Ensure virtuals are included in JSON
menuItemSchema.set('toJSON', { virtuals: true });
menuItemSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
