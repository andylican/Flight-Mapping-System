require('dotenv').config();

let flights = require('./flights.json');

const Airport = require('./models/Airport').Airport;
const Flight = require('./models/Flight').Flight;

const mongoose = require('mongoose');
const arc = require('arc');

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log(err ? 'error connecting to mongodb':'connected to mongodb');
});

const findLegAirports = async leg => {
    let arrival = Airport.findOne({icao: leg.arrival_airport});
    let departure = Airport.findOne({icao: leg.departure_airport});

    let [arr, dep] = await Promise.all([arrival, departure]);
    arr = arr.toJSON();
    dep = dep.toJSON();

    const aTime = new Date(leg.arrival_time);
    const dTime = new Date(leg.departure_time);

    const generator = new arc.GreatCircle({y: dep.latitude, x: dep.longitude}, {y: arr.latitude, x: arr.longitude});
    const path = generator.Arc((aTime - dTime)/1000/60).geometries[0].coords.map((([x, y]) => ([y, x])));

    return {
        ...leg,
        arrival_airport: arr,
        arrival_time: new Date(leg.arrival_time),
        departure_time: new Date(leg.departure_time),
        departure_airport: dep,
        path: path,
    };
}

flights = flights.map(async flight => {
    let legs = await Promise.all(flight.legs.map(findLegAirports));
    legs.sort((a, b) => {
        return a.departure_time - b.departure_time;
    });
    return {
        ...flight,
        legs: legs,
    };
});

Promise.all(flights).then(docs => Flight.insertMany(docs));