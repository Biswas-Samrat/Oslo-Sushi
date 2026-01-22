const Order = require('../models/Order');

// Create new order and send WhatsApp notification
const createOrder = async (req, res) => {
    try {
        const orderData = req.body;

        // 1. Save to Database (Optional but recommended)
        const order = await Order.create(orderData);

        res.status(201).json({
            success: true,
            message: 'Order placed successfully!',
            data: order
        });

        // 2. Send WhatsApp Notification via Twilio
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;

            if (accountSid && authToken) {
                const client = require('twilio')(accountSid, authToken);

                // Format Items List
                const itemsList = order.items.map(item =>
                    `- ${item.qty}x ${item.name} (€${item.price.toFixed(2)})`
                ).join('\n');

                // Format Message Body
                const messageBody = `*New Delivery Order!* 🛵
---------------------------
*Customer:* ${order.customer.name}
*Phone:* ${order.customer.phone}
*Address:* ${order.customer.address.street}, ${order.customer.address.number}
${order.customer.address.floor ? `Floor/Door: ${order.customer.address.floor}` : ''}
${order.customer.address.zip}, ${order.customer.address.city}
---------------------------
*Order:*
${itemsList}
---------------------------
*Total:* €${order.totalAmount.toFixed(2)}
*Payment:* Cash on Delivery 💵
*Notes:* ${order.instructions || 'None'}
---------------------------
*Order ID:* ${order._id}`;

                await client.messages.create({
                    from: 'whatsapp:+14155238886', // Twilio Sandbox Number
                    to: 'whatsapp:+8801882746498',  // Admin Number
                    body: messageBody
                });

                console.log('WhatsApp order notification sent successfully');
            } else {
                console.log('Twilio credentials missing - skipping WhatsApp notification');
            }
        } catch (twilioError) {
            console.error('Failed to send WhatsApp notification:', twilioError.message);
        }

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({
            success: false,
            message: 'Error placing order',
            error: error.message
        });
    }
};

/**
 * Get all orders (Admin)
 */
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders
};
