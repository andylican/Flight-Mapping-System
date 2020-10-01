import { faPlane, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Collapse, Divider, Layout, Row, Slider, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import moment from 'moment';
import { CloseOutlined } from '@ant-design/icons';

import './Sider.css';

export default class Sider extends React.Component {
    componentDidUpdate() {
        
    }

    formatMins = mins => `${Math.floor(mins/60)}h ${mins % 60}m`;
    
    handleSlider = val => {
        const {flight, leg} = this.props.currFlight;
        this.props.setDate(moment(flight.legs[leg].departure_time).utc(false).add(val, 'minutes'));
    }

    render() {
        const {flight, leg} = this.props.currFlight;

        let content = <Typography.Text>No Flight Selected :(</Typography.Text>;

        if (flight) {
            const info = flight.legs[leg];
            console.log(info);
            const departureMoment = moment(info.departure_time).utc(false);
            const arrivalMoment = moment(info.arrival_time).utc(false);
            const minsIntoFlight = Math.max(0, Math.round(moment.duration(this.props.date.diff(departureMoment)).asMinutes())); // if flight has yet to depart, set time minsIntoFlight 0
            const [currLat, currLon] = info.path[Math.min(minsIntoFlight, info.path.length-1)];

            content = <>
                <Row className="sider-header">
                    <Col xs={4} style={{alignItems: 'start', justifyContent: 'start'}}>
                        <CloseOutlined className="ant-page-header-back-button" style={{fontSize: '1.17em'}}
                            onClick={() => this.props.setCollapsed(true)}/>
                    </Col>
                    <Col xs={16}><Typography.Title level={3}><Space><FontAwesomeIcon icon={faPlane}/>{info.meta.callsign}</Space></Typography.Title></Col>
                </Row>
                <Divider/>
                <Row>
                    <Col sm={12}>
                        <Typography.Title level={5}><Space><FontAwesomeIcon icon={faPlaneDeparture}/>Departure</Space></Typography.Title>    
                        <Tooltip title={info.departure_airport.name}><Typography.Text>{info.departure_airport.icao}</Typography.Text></Tooltip>
                        <Typography.Text>{departureMoment.format("ddd MM/DD")}</Typography.Text>
                        <Typography.Text>{departureMoment.format("HH:mm:ss Z")}</Typography.Text>
                    </Col>
                    <Col sm={12}>
                        <Typography.Title level={5}><Space><FontAwesomeIcon icon={faPlaneArrival}/>Arrival</Space></Typography.Title>
                        <Tooltip title={info.arrival_airport.name}><Typography.Text>{info.arrival_airport.icao}</Typography.Text></Tooltip>
                        <Typography.Text>{arrivalMoment.format("ddd MM/DD")}</Typography.Text>
                        <Typography.Text>{arrivalMoment.format("HH:mm:ss Z")}</Typography.Text>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col xs={19}>
                        <Slider style={{width: '100%'}} max={info.path.length} onChange={this.handleSlider} min={0} value={minsIntoFlight} tipFormatter={this.formatMins}/>
                    </Col>
                    <Col xs={5}>
                        {this.formatMins(info.path.length)}
                    </Col>
                </Row>
                <Row>
                    <Col xs={10}>
                        <Typography.Text strong>Current (lat, lng)</Typography.Text>
                    </Col>
                    <Col xs={14}>
                        <Typography.Text>{`${currLat.toFixed(6)}, ${currLon.toFixed(6)}`}</Typography.Text>
                    </Col>
                </Row>
                <Divider/>
                <Collapse>
                    <Collapse.Panel header={`Leg: ${leg + 1} of ${flight.legs.length}`}>
                    </Collapse.Panel>
                    <Collapse.Panel header={`Extra Info: `}>
                    </Collapse.Panel>
                </Collapse>
            </>;
        }
                    
        return (
            <Layout.Sider 
                theme="light" 
                width={350} 
                onCollapse={(collapsed) => this.props.setCollapsed(collapsed)} 
                collapsedWidth={0} 
                collapsible 
                collapsed={this.props.collapsed} 
                style={{display: 'flex', flexDirection:'column', position: 'fixed', zIndex: 2, height: '90vh'}}
            >
                {content}
            </Layout.Sider>
        );
    }
}