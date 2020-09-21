import React, {Component} from "react";
import "./AircraftMap.css";
import { Map, Marker, TileLayer, ZoomControl, Polyline } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from "leaflet";
import { getFlights } from "../../services/flights";
import moment from 'moment';

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
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {this.state.flights.map((flight, index) => {
                    return flight.legs.map((leg, i) => {
                        const aTime = moment(leg.arrival_time);
                        const dTime = moment(leg.departure_time);
                        if (simDate.isBetween(dTime, aTime)) {
                            const minsFromDepart = Math.round(moment.duration(simDate.diff(dTime)).asMinutes());
                            return <>
                                <Polyline dashArray="4" color="black" weight={2} positions={leg.path} key={`p-${index}-${i}`}/>
                                <Marker key={`m-${index}-${i}`} position={leg.path[minsFromDepart]} icon={planeIcon}/>
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