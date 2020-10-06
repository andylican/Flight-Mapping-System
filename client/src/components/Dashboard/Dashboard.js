import React, {Component} from "react";
import "./Dashboard.css";
import moment from "moment";

import {
    Menu,
    Dropdown,
    Button,
    Input,
    DatePicker,
    TimePicker
} from 'antd';

import {
    CaretUpOutlined,
    SearchOutlined
} from "@ant-design/icons";
import {
    FaPlane,
    FaHelicopter,
    FaBackward,
    FaForward,
    FaPlay,
    FaPause,
} from "react-icons/fa";

export default class Dashboard extends Component {
    state = {
        currentAircraft: "All Aircraft",
        playSpeed: 1,
        play: false,
        searchedAircraft: "",
        filteredAircrafts: []
    }

    togglePlay = () => {
        this.setState(prevState => ({play: !prevState.play}), () => {
            if (this.state.play) {
                this.setTimer();
            } else {
                this.clearTimer();
            }
        });
    }

    clearTimer = () => clearInterval(this.timer);
    setTimer = () => this.timer = setInterval(() => this.setDate(moment(this.props.date).add(1, 'minutes')), 1000 / Math.pow(2, this.state.playSpeed-1));

    setDate = date => {
        this.props.setDate(date);
    }

    setPlaySpeed = (num) => {
        if (num >= 1) {
            this.setState({playSpeed: num}, () => {
                this.clearTimer();
                if (this.state.play) this.setTimer();
            });
        }
    }

    setSearchAircraft = e => { //Filters aircraft when searching
        const searchedAircraft = e.target.value;
        const filteredAircrafts = this.props.flights.filter(flight => flight.legs[0].meta.callsign.toLowerCase().includes(searchedAircraft));
        this.setState({searchedAircraft, filteredAircrafts});
    }

    render() {
        const menu = <Menu>
            <Menu.Item disabled>
                <Input placeholder="Search Aircraft By Code" prefix={<SearchOutlined/>} value={this.state.searchedAircraft} onChange={this.setSearchAircraft}/>
            </Menu.Item>
            {this.state.searchedAircraft === "" ?
            <>
                <Menu.Item onClick={() => this.setState({currentAircraft: "All Aircraft"})}>
                    <FaPlane/> <FaHelicopter/> All Aircraft
                </Menu.Item>
                <Menu.Item onClick={() => this.setState({currentAircraft: "Airplanes"})}>
                    <FaPlane/> Airplanes
                </Menu.Item>
                <Menu.Item onClick={() => this.setState({currentAircraft: "Helicopters"})}>
                    <FaHelicopter/> Helicopters
                </Menu.Item>
            </> : <>
                {this.state.filteredAircrafts.slice(0, 10).map(aircraft => 
                    <Menu.Item onClick={() => this.setState({currentAircraft: aircraft.legs[0].meta.callsign})}>
                        <FaPlane/> {aircraft.legs[0].meta.callsign}
                    </Menu.Item>
                )}
            </>
            }
        </Menu>;

        return (
            <div id="dashboard">
                <Dropdown overlay={menu} trigger={['click']} placement="topLeft" arrow={true}>
                    <h4>
                        <Button style={{margin: 0}} onClick={e => e.preventDefault()}>
                            {this.state.currentAircraft} <CaretUpOutlined style={{fontSize: "15px"}}/>
                        </Button>
                    </h4>
                </Dropdown>

                <h2 className="element">
                    x {this.state.playSpeed}
                </h2>

                <h2 className="element">
                    <FaBackward className="button" onClick={() => this.setPlaySpeed(this.state.playSpeed - 1)}/>
                    {!this.state.play ? <FaPlay className="button" onClick={this.togglePlay}/>
                    : <FaPause className="button" onClick={this.togglePlay}/>}
                    <FaForward className="button" onClick={() => this.setPlaySpeed(this.state.playSpeed + 1)}/>
                </h2>

                <h4 className="element">
                    <TimePicker onChange={this.setDate} format="HH:mm" value={this.props.date}/>
                </h4>
                    
                <h4 className="element">
                    <DatePicker onChange={this.setDate} value={this.props.date}/>
                </h4>
            </div>
        );
    }
}