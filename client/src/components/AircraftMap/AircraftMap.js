import React, {Component} from "react";
import "./AircraftMap.css";
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon, Polyline } from "leaflet";
import { getFlights } from "../../services/flights";

export default class AircraftMap extends Component {
    state = {
        flights: [],
        aircraft: [
            {
                lat: 45.4,
                lng: -75.7,
                type: "airplane"
            },
            {
                lat: 60,
                lng: -80,
                type: "helicopter"
            }
        ]
    }

    componentDidMount() {
        getFlights().then(val => {
            console.log(val);
            this.setState({flights: val});
        });
    }

    render() {
        const planeMarkup = renderToStaticMarkup(<i className="fas fa-plane" style={{fontSize: "25px"}}/>);
        const helicopterMarkup = renderToStaticMarkup(<i className="fas fa-helicopter" style={{fontSize: "25px"}}/>);
        const planeIcon = divIcon({
            html: planeMarkup,
        });
        const helicopterIcon = divIcon({
            html: helicopterMarkup
        });

        return (
            <Map center={[45.4, -75.7]} zoom={4} zoomControl={false}>
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {this.state.aircraft.map((craft, index) => (
                    <Marker key={index} position={[craft.lat, craft.lng]} icon={craft.type === "airplane" ? planeIcon : helicopterIcon}/>
                ))}
                {this.state.flights.map((flight, index) => {
                    return <Polyline positions={flight}/>;
                })}
                <ZoomControl position="bottomright"/>
            </Map>
        );
    }
}