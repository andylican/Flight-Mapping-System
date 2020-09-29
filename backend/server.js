const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Flight = require('./models/Flight').Flight;
require('dotenv').config();

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log(err && 'connected to mongodb');
});

app.get("/flights", (req, res) => {
    Flight.find({}, (err, docs) => {
        docs = docs.map(val => val.toJSON());
        res.send(JSON.stringify(docs));
    });
});

app.get("/airport", (req, res) => {
    req.params;
    
});

app.listen(8080, () => console.log('listening on :8080'));