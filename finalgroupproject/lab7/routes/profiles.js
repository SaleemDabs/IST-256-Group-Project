var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

// MongoDB Connection URI
const mongoUri = 'mongodb://localhost:27017/';
const dbName = 'songDatabase';
const collectionName = 'profiles';

// Add a new profile
router.post('/', async function (req, res, next) {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required.' });
  }

  try {
    const client = await MongoClient.connect(mongoUri, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert profile
    const result = await collection.insertOne({ username, email });

    client.close();
    res.status(201).json({ message: 'Profile created successfully!', profile: result.ops[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error saving profile', details: err.message });
  }
});

module.exports = router;
