const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "ecommerce";

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = { connectDB, client };