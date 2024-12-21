async function createProductCollection(db) {
    await db.createCollection("products", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "price", "inventoryCount"],
                properties: {
                    name: { bsonType: "string" },
                    description: { bsonType: "string" },
                    price: { bsonType: "number" },
                    category: { bsonType: "string" },
                    inventoryCount: { bsonType: "number" },
                    inventoryLocations: {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: ["warehouseId", "quantity"],
                            properties: {
                                warehouseId: { bsonType: "objectId" },
                                quantity: { bsonType: "number" }
                            }
                        }
                    }
                }
            }
        }
    });

    await db.collection("products").createIndex({ name: 1 });
    await db.collection("products").createIndex({ category: 1 });
}

async function createProduct(db, productData) {
    return await db.collection("products").insertOne(productData);
}

async function updateInventory(db, productId, warehouseId, quantity) {
    return await db.collection("products").updateOne(
        {
            _id: productId,
            "inventoryLocations.warehouseId": warehouseId
        },
        {
            $inc: {
                "inventoryLocations.$.quantity": quantity,
                inventoryCount: quantity
            }
        }
    );
}

module.exports = { createProductCollection, createProduct, updateInventory };