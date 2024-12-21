const express = require('express');
const { connectDB } = require('./config/db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const port = 3000;
let db;

// Connect to database when server starts
async function initializeServer() {
    db = await connectDB();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Order creation endpoint
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, items, deliveryAddress } = req.body;

        // Calculate total amount
        let totalAmount = 0;
        for (const item of items) {
            const product = await db.collection('products').findOne(
                { _id: new ObjectId(item.productId) }
            );
            if (!product) {
                return res.status(404).json({ error: `Product ${item.productId} not found` });
            }
            totalAmount += product.price * item.quantity;
        }

        const order = {
            userId: new ObjectId(userId),
            items: items.map(item => ({
                productId: new ObjectId(item.productId),
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount,
            status: 'pending',
            deliveryAddress,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('orders').insertOne(order);
        res.status(201).json({ orderId: result.insertedId });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

initializeServer();