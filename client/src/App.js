import React from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

function App() {
  const position = [51.505, -0.09];
  return (
    <Map zoomControl={false} center={position} zoom={13}>
      <ZoomControl position={"topright"}/>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
      </Marker>
    </Map>
  );
}

export default App;
