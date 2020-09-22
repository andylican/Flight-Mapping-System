import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Descriptions, Layout, Space } from 'antd';
import React from 'react';
import moment from 'moment';

export default class Sider extends React.Component {
    componentDidUpdate() {
        const {flight, leg} = this.props.currFlight;

        console.log(flight&& flight.legs[leg]);
    }
    render() {
        const {flight, leg} = this.props.currFlight;

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
                {flight && 
                (() => {
                    const info = flight.legs[leg];
                    return (
                    <Descriptions bordered column={2} layout="vertical" title={<Space><FontAwesomeIcon icon={faPlane}/>{info.meta.callsign}</Space>} size="small">
                        <Descriptions.Item label="Departure">{`${info.departure_airport.name} (${info.departure_airport.icao})`}</Descriptions.Item>
                        <Descriptions.Item label="Time">{`${moment(info.departure_time).utc(false).format("ddd MM/DD/YY HH:MM:ss")}`}</Descriptions.Item>

                        <Descriptions.Item label="Arrival">{`${info.arrival_airport.name} (${info.arrival_airport.icao})`}</Descriptions.Item>
                        <Descriptions.Item label="Time">{`${moment(info.arrival_time).utc(false).format("ddd MM/DD/YY HH:MM:ss")}`}</Descriptions.Item>
                    </Descriptions>
                    );
                })()
                    

                }
                
            </Layout.Sider>
        );
    }
}