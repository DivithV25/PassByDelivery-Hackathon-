// // const express = require('express');
// // const { MongoClient, ObjectId } = require('mongodb');
// // const cors = require('cors');

// // const app = express();
// // const port = 3000;

// // // Updated connection string with specific options
// // const uri = "mongodb://127.0.0.1:27017/?directConnection=true";
// // const client = new MongoClient(uri, {
// //     serverSelectionTimeoutMS: 5000,
// //     socketTimeoutMS: 45000,
// // });

// // async function connectToDatabase() {
// //     try {
// //         await client.connect();
// //         const db = client.db("ecommerce");
// //         console.log("Successfully connected to MongoDB.");
// //         return db;
// //     } catch (error) {
// //         console.error("Database connection error:", error);
// //         process.exit(1);
// //     }
// // }

// // app.use(cors());
// // app.use(express.json());

// // // Test endpoint
// // app.get('/api/test', (req, res) => {
// //     res.json({ message: "Server is running" });
// // });

// // // Order endpoint
// // app.post('/api/orders', async (req, res) => {
// //     const db = await connectToDatabase();
// //     try {
// //         const { userId, items, deliveryAddress } = req.body;

// //         const order = {
// //             userId: userId,
// //             items: items,
// //             deliveryAddress: deliveryAddress,
// //             status: 'pending',
// //             createdAt: new Date(),
// //             updatedAt: new Date()
// //         };

// //         const result = await db.collection('orders').insertOne(order);
// //         console.log("Order created:", result.insertedId);
// //         res.status(201).json({
// //             message: "Order created successfully",
// //             orderId: result.insertedId
// //         });

// //     } catch (error) {
// //         console.error("Error creating order:", error);
// //         res.status(500).json({ error: "Failed to create order" });
// //     }
// // });

// // async function startServer() {
// //     try {
// //         await connectToDatabase();
// //         app.listen(port, () => {
// //             console.log(`Server running on http://localhost:${port}`);
// //         });
// //     } catch (error) {
// //         console.error("Failed to start server:", error);
// //     }
// // }

// // startServer();



// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/shopping", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Connected to MongoDB");
// }).catch(err => {
//     console.error("MongoDB connection error:", err);
// });

// // Define Order Schema
// const orderSchema = new mongoose.Schema({
//     item: String,
//     price: Number,
//     quantity: Number,
//     imageUrl: String,
//     totalAmount: Number,
//     orderDate: { type: Date, default: Date.now }
// });

// // Create Order Model
// const Order = mongoose.model("Order", orderSchema);

// // POST /api/orders - Endpoint to place an order
// app.post("/api/orders", async (req, res) => {
//     const { item, price, quantity, imageUrl, totalAmount, orderDate } = req.body;

//     try {
//         const newOrder = new Order({
//             item,
//             price,
//             quantity,
//             imageUrl,
//             totalAmount,
//             orderDate
//         });

//         // Save the order to the database
//         const savedOrder = await newOrder.save();

//         // Send response with the saved order
//         res.status(201).json({
//             message: "Order placed successfully",
//             orderId: savedOrder._id,
//             order: savedOrder
//         });
//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ message: "Failed to place order", error: error.message });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

const uri = "mongodb://127.0.0.1:27017/?directConnection=true";
const client = new MongoClient(uri);
let db;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db("ecommerce");
        console.log("Connected to MongoDB");
        return db;
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

// Phase 1: Place Order
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, items, deliveryAddress } = req.body;

        // Create order
        const order = {
            userId: userId,
            items: items,
            deliveryAddress: deliveryAddress,
            status: 'pending',
            deliveryPersonId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Insert order and update client
        const orderResult = await db.collection('orders').insertOne(order);
        await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $push: { orderHistory: orderResult.insertedId } }
        );

        res.status(201).json({
            message: "Order placed successfully",
            orderId: orderResult.insertedId
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Phase 2: Delivery Person Selects Order
app.post('/api/delivery/select-order', async (req, res) => {
    try {
        const { orderId, deliveryPersonId } = req.body;

        // Update order
        await db.collection('orders').updateOne(
            { _id: new ObjectId(orderId) },
            {
                $set: {
                    deliveryPersonId: deliveryPersonId,
                    status: 'in_delivery',
                    updatedAt: new Date()
                }
            }
        );

        // Update delivery person
        await db.collection('deliveryPersons').updateOne(
            { _id: new ObjectId(deliveryPersonId) },
            {
                $push: { activeOrders: new ObjectId(orderId) },
                $set: { status: 'busy' }
            }
        );

        res.json({ message: "Order assigned successfully" });

    } catch (error) {
        console.error("Error assigning order:", error);
        res.status(500).json({ error: "Failed to assign order" });
    }
});

// Phase 3: Complete Delivery
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, items, deliveryAddress } = req.body;

        // Create order
        const order = {
            userId: userId,
            items: items,
            deliveryAddress: deliveryAddress,
            status: 'pending',
            deliveryPersonId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Insert order
        const orderResult = await db.collection('orders').insertOne(order);
        console.log('Order inserted with ID:', orderResult.insertedId);  // Log the inserted order ID

        // Update user order history
        await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $push: { orderHistory: orderResult.insertedId } }
        );

        // Send response back to the client
        res.status(201).json({
            message: "Order placed successfully",
            orderId: orderResult.insertedId
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});


// Get status endpoints
app.get('/api/status/order/:orderId', async (req, res) => {
    try {
        const order = await db.collection('orders').findOne(
            { _id: new ObjectId(req.params.orderId) }
        );
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
});

app.get('/api/status/delivery-person/:id', async (req, res) => {
    try {
        const deliveryPerson = await db.collection('deliveryPersons').findOne(
            { _id: new ObjectId(req.params.id) }
        );
        res.json(deliveryPerson);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch delivery person" });
    }
});

// Start server
async function startServer() {
    await connectToDatabase();
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

startServer();