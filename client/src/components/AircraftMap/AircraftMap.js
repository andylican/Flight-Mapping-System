import React, {Component} from "react";
import "./AircraftMap.css";
import { Map, Marker, TileLayer, ZoomControl, Polyline } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from "leaflet";
import { getFlights } from "../../services/flights";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment, { min } from 'moment';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';

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
            this.setState({flights: val.data});
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

        const simDate = moment(this.props.date);

        return (
            <Map center={[45.4, -75.7]} zoom={4} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {this.state.flights.map((flight, index) => {
                    return flight.legs.map((leg, i) => {
                        const aTime = moment(leg.arrival_time);
                        const dTime = moment(leg.departure_time);
                        if (simDate.isBetween(dTime, aTime)) {
                            const minsFromDepart = Math.round(moment.duration(simDate.diff(dTime)).asMinutes());
                            let [beg, end] = leg.path.length - 1 === minsFromDepart ? [minsFromDepart-1, minsFromDepart]:[minsFromDepart, minsFromDepart + 1];
                            const rotation = Math.round(Math.asin((leg.path[beg][0] - leg.path[end][0])/(leg.path[beg][1] - leg.path[end][1])) * (-180/Math.PI));
                            console.log(rotation);
                            const icon = renderToStaticMarkup(<i className="fas fa-plane" style={{fontSize: "25px", transform: `rotate(${rotation}deg)`}}/>)
                            return <>
                                <Polyline dashArray="4" color="black" weight={2} positions={leg.path} key={`p-${index}-${i}`}/>
                                <Marker key={`m-${index}-${i}`} position={leg.path[minsFromDepart]} icon={divIcon({html: icon})}/>
                            </>
                        }
                        return null;
                    });
                })}
                <ZoomControl position="bottomright"/>
            </Map>
        );
    }
}