import React, {Component} from "react";
import "./AircraftMap.css";
import { Map, Marker, TileLayer, ZoomControl, Polyline } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from "leaflet";
import moment from 'moment';

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

    render() {
        const simDate = moment(this.props.date).utc(false);

        return (
            <Map useFlyTo attributionControl={false} center={this.props.center} zoom={4} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {this.props.flights && this.props.flights.map((flight, index) => {
                    return flight.legs.map((leg, i) => {
                        const aTime = moment(leg.arrival_time);
                        const dTime = moment(leg.departure_time);
                        if (simDate.isBetween(dTime, aTime)) {
                            const minsFromDepart = Math.round(moment.duration(simDate.diff(dTime)).asMinutes());
                            // get current point and point closest to current without going over length or below 0
                            let [beg, end] = leg.path.length - 1 === minsFromDepart ? [minsFromDepart-1, minsFromDepart]:[minsFromDepart, minsFromDepart + 1];
                            let rotation = Math.round(Math.asin((leg.path[end][0] - leg.path[minsFromDepart][0])/(leg.path[end][1] - leg.path[minsFromDepart][1])) * (-180/Math.PI));

                            const lngNext = leg.path[end][1];
                            const lngCurrent = leg.path[beg][1];
                            if ((lngNext < lngCurrent || (lngNext > 170 && lngCurrent < -170)) && !(lngNext < -170 && lngCurrent > 170)) { //Checks if we need to rotate plane to the left
                                rotation += 180;
                            }

                            const icon = renderToStaticMarkup(<i className="fas fa-plane" style={{fontSize: "25px", transform: `rotate(${rotation}deg)`}}/>);
                            return <div key={`${index}-${i}`}>
                                <Polyline dashArray="4" color="black" weight={2} positions={leg.path} key={`p-${index}-${i}`}/>
                                <Marker attribution={{index: index}} onclick={() => {
                                    this.props.setCurrFlight({flight: flight, leg: i});
                                    this.props.setCenter(leg.path[minsFromDepart]);
                                    }} key={`m-${index}-${i}`} position={leg.path[minsFromDepart]} icon={divIcon({html: icon, iconSize: [35, 25]})}/>
                            </div>
                        }
                        return null;
                    });
                })}
                <ZoomControl position="bottomright"/>
            </Map>
        );
    }
}

AircraftMap.defaultProps = {
    flights: [],
    center: [49.8951, 97.1384]
}