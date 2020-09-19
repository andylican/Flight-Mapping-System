import React, {Component} from "react";
import "./AircraftMap.css";
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from "leaflet";

export default class AircraftMap extends Component {
    state = {
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
                <ZoomControl position="bottomright"/>
            </Map>
        );
    }
}