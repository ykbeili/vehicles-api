var express = require('express');
var router = express.Router();
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId; 
const connectionString = process.env.MONGO_CLIENT

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('vehicles');
    const vehiclesCollection = db.collection('vehicles');
    vehiclesCollection.find().toArray()
    .then(results => {
      res.send({ data: results })
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
    vehiclesCollection.findOne({ "_id": ObjectId(req.params.id) })
    .then(results => {
      res.send({ data: results })
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
      res.send({ data: results })
    })
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('vehicles');
    const vehiclesCollection = db.collection('vehicles');
    vehiclesCollection.updateOne({ "_id": ObjectId(req.params.id) }, {$set: { "make": req.body.make, "model": req.body.model }}, function(err, results) {
      if (err) throw err;
      res.send({ data: results })
    })
  })
  .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('vehicles');
    const vehiclesCollection = db.collection('vehicles');
    vehiclesCollection.deleteOne({ "_id": ObjectId(req.params.id) }, function(err, results) {
      if (err) throw err;
      res.send({ data: results })
    })
  })
  .catch(error => console.error(error))
})
module.exports = router;