const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, select: false},
    id: {type: Number, select: false},
    icao: String,
    iata: String,
    name: String,
    city: String,
    country: String,
    latitude: Number,
    longitude: Number,
    altitude: Number,
    timezone: Number,
    dst: String,
    tz_olson: {type: String, select: false},
    type: String,
    source: {type: String, select: false},
});

const Airport = mongoose.model("Airport", airportSchema);

module.exports = {
    Airport: Airport,
    airportSchema: airportSchema,
}