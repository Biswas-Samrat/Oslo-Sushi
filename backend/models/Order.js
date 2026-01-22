const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: {
            street: String,
            number: String,
            floor: String,
            zip: String,
            city: String
        }
    },
    items: [{
        name: String,
        qty: Number,
        price: Number,
        total: Number
    }],
    totalAmount: { type: Number, required: true },
    instructions: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
