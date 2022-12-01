async function getCollection(clientPromise, dbName, collectionName) {    
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    return collection
}

module.exports = getCollection