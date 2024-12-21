const { ObjectId } = require('mongodb');

async function createUserCollection(db) {
    await db.createCollection("users", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["email", "name", "phone"],
                properties: {
                    email: {
                        bsonType: "string",
                        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                    },
                    name: { bsonType: "string" },
                    phone: { bsonType: "string" },
                    address: {
                        bsonType: "object",
                        required: ["street", "city", "state", "zipCode"],
                        properties: {
                            street: { bsonType: "string" },
                            city: { bsonType: "string" },
                            state: { bsonType: "string" },
                            zipCode: { bsonType: "string" }
                        }
                    }
                }
            }
        }
    });

    await db.collection("users").createIndex({ email: 1 }, { unique: true });
}

async function createUser(db, userData) {
    return await db.collection("users").insertOne(userData);
}

async function getUser(db, userId) {
    return await db.collection("users").findOne({ _id: new ObjectId(userId) });
}

module.exports = { createUserCollection, createUser, getUser };