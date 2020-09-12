import React, {Component} from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

export default class AircraftMap extends Component {
    state = {

    }

    componentDidMount() {

    }

    render() {
        return (
            <Map center={[45.4, -75.7]} zoom={3}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </Map>
        );
    }
}