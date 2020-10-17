
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Flight = require('./models/Flight').Flight;
require('dotenv').config();

app.use(cors());
console.log(Flight);
console.log( process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log(err && 'connected to mongodb');
});

app.get("/flights", (req, res) => {

    Flight.find({}, (err, docs) => {
        docs = docs.map(val => val.toJSON());
        res.send(JSON.stringify(docs));
    });
});


//All flights containing legs that depart from or arrive at a particular airport specified by ICAO
app.get("/flights/:icao", (req, res) => {
    var query = { $or: [{"legs.departure_airport.icao": req.params['icao']}, {"legs.arrival_airport.icao": req.params['icao']}]};
    Flight.find(query, (err, docs) => {
       docs = docs.map(val => val.toJSON());
       res.send(JSON.stringify(docs));
    });
});

//All flights containing legs that depart within the specified time range
app.get("/flights/depart/:startTime/:endTime", (req, res) => {
  var start = new Date(req.params['startTime']);
  var end = new Date(req.params['endTime']);
  console.log(start,end);
  var query = {legs: {$elemMatch: {departure_time: {$gt: start, $lt: end}}}};

  Flight.find(query, (err, docs) => {
     docs = docs.map(val => val.toJSON());
     res.send(JSON.stringify(docs));
  });
});

//All flights containing legs that arrive within the specified time range
app.get("/flights/arrive/:startTime/:endTime", (req, res) => {
  var start = new Date(req.params['startTime']);
  var end = new Date(req.params['endTime']);
  console.log(start,end);
  var query = {legs: {$elemMatch: {arrival_time: {$gt: start, $lt: end}}}};

  Flight.find(query, (err, docs) => {
     docs = docs.map(val => val.toJSON());
     res.send(JSON.stringify(docs));
  });
});

app.listen(8080, () => console.log('listening on :8080'));
