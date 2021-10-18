var express = require('express');
var router = express.Router();
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.MONGO_CLIENT

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('vehicles');
    const vehiclesCollection = db.collection('vehicles');
    vehiclesCollection.find().toArray()
    .then(results => {
        return results
      })
      .catch(error => console.error(error))
  })
  .catch(error => console.error(error))
});

router.get('/:id', function(req, res, next) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('vehicles');
    const vehiclesCollection = db.collection('vehicles');
    vehiclesCollection.find().toArray()
    .then(results => {
      return results
    })
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error))
 });

router.post('/', (req, res) => {
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('vehicles');
    const vehiclesCollection = db.collection('vehicles');
    vehiclesCollection.insertOne(req.body)
    .then(results => {
      return results
    })
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error))
})

module.exports = router;