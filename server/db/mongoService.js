const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'test';
let client;
let db;
let collection;

async function init() {
  client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db(dbName);

  collection = db.collection('lab');
}

init();

module.exports = {
  async findById() {
    const result = await collection.find({}).toArray();
    return result;
  },

  async addItem(item) {
    await collection.insert({ item });
    console.log('added item successfully');
  },

  async deleteItem(id) {
    await collection.deleteOne({ "_id": ObjectId(id) });
    console.log('deteled item successfully');
  },
};
