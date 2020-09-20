const mongoose = require("mongoose");
const airportSchema = require('./Airport').airportSchema;

const flightSchema = new mongoose.Schema({
    id: String,
    legs: [
        {
            _id: false,
            departure_airport: airportSchema, 
            departure_time: Date,
            arrival_airport: airportSchema, 
            arrival_time: Date,
            path: [[Number,Number]],
            meta: {
                callsign: String,
            },
        },
    ],
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = {
    Flight: Flight,
    flightSchema: flightSchema,
}