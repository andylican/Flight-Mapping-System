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
        if (num >= 1 && num <= 10) {
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

    keyPress = e => {
        if (e.key === " ") {
            this.togglePlay();
        }
    }

    keyDown = e => {
        if (e.key === "ArrowRight") {
            this.setPlaySpeed(this.state.playSpeed + 1);
        } else if (e.key === "ArrowLeft") {
            this.setPlaySpeed(this.state.playSpeed - 1);
        }
    }

    render() {
        const simDate = moment(this.props.date).utc(false);

        const menu = <Menu>
            <Menu.Item disabled>
                <Input placeholder="Search Aircraft By Code" prefix={<SearchOutlined/>} value={this.state.searchedAircraft} onChange={this.setSearchAircraft}/>
            </Menu.Item>
            {this.state.searchedAircraft === "" && Object.keys(this.props.currFlight).length === 0 ?
            <>
                <Menu.Item onClick={() => this.setState({currentAircraft: "All Aircraft"})}>
                    <FaPlane/> <FaHelicopter/> All Aircraft
                </Menu.Item>
                {/*<Menu.Item onClick={() => this.setState({currentAircraft: "Airplanes"})}>
                    <FaPlane/> Airplanes
                </Menu.Item>
                <Menu.Item onClick={() => this.setState({currentAircraft: "Helicopters"})}>
                    <FaHelicopter/> Helicopters
                </Menu.Item>*/}
            </> : <>
                {this.state.filteredAircrafts.slice(0, 5).map(aircraft => 
                    aircraft.legs.map(leg => 
                        <Menu.Item onClick={() => {
                            this.props.setCurrFlight({flight: aircraft, leg: aircraft.legs.indexOf(leg)});
                            this.props.selectAircraft(aircraft, leg);
                            const aTime = moment(leg.arrival_time);
                            const dTime = moment(leg.departure_time);

                            if (simDate.isBetween(dTime, aTime)) {
                                const minsFromDepart = Math.round(moment.duration(simDate.diff(dTime)).asMinutes());
                                this.props.setCenter(leg.path[minsFromDepart]);
                            }
                        }}>
                            <FaPlane/> {leg.meta.callsign} - Leg {aircraft.legs.indexOf(leg)+1}
                        </Menu.Item>
                    )
                )}
            </>
            }
        </Menu>;

        const {flight, leg} = this.props.currFlight;

        return (
            <div id="dashboard" onKeyPress={this.keyPress} onKeyDown={this.keyDown} tabIndex={0}>
                <Dropdown overlay={menu} trigger={['click']} placement="topLeft" arrow={true}>
                    <h4>
                        <Button style={{margin: 0}} onClick={e => e.preventDefault()}>
                            {Object.keys(this.props.currFlight).length === 0 ? "All Aircraft" : flight.legs[leg].meta.callsign} <CaretUpOutlined style={{fontSize: "15px"}}/>
                        </Button>
                    </h4>
                </Dropdown>

                <h2 className="element" onKeyPress={() => console.log("hi")}>
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