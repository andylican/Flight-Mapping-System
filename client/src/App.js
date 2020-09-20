import React, {Component, useState} from 'react';
import AircraftMap from "./components/AircraftMap/AircraftMap";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css';
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

function App() {
  const [time, setTime] = useState(Date.now());
  return (
    <div className="App">
      <AircraftMap time={time}/>
      <Dashboard time={time}/>
    </div>
  );
}

export default App;
