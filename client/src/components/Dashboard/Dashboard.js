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
    FaClock
} from "react-icons/fa";

export default class Dashboard extends Component {
    state = {
        currentAircraft: "All Aircraft",
        playSpeed: 1,
        play: false,
        date: moment()
    }

    togglePlay = () => {
        this.setState(prevState => ({play: !prevState.play}));
    }

    setDate = date => {
        this.setState({date}, console.log(date));
    }

    render() {
        return (
            <div id="dashboard">
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item disabled>
                            <Input placeholder="Search Aircraft By Code" prefix={<SearchOutlined/>}/>
                        </Menu.Item>
                        <Menu.Item onClick={() => this.setState({currentAircraft: "All Aircraft"})}>
                            <FaPlane/> <FaHelicopter/> All Aircraft
                        </Menu.Item>
                        <Menu.Item onClick={() => this.setState({currentAircraft: "Airplanes"})}>
                            <FaPlane/> Airplanes
                        </Menu.Item>
                        <Menu.Item onClick={() => this.setState({currentAircraft: "Helicopters"})}>
                            <FaHelicopter/> Helicopters
                        </Menu.Item>
                    </Menu>
                } trigger={['click']} placement="topLeft" arrow={true}>
                    <h4>
                        <Button style={{margin: 0}} onClick={e => e.preventDefault()}>
                            {this.state.currentAircraft} <CaretUpOutlined style={{fontSize: "20px"}}/>
                        </Button>
                    </h4>
                </Dropdown>

                <h2 className="element">
                    x {this.state.playSpeed}
                </h2>

                <h2 className="element">
                    <FaBackward className="button"/>
                    {!this.state.play ? <FaPlay className="button" onClick={this.togglePlay}/>
                    : <FaPause className="button" onClick={this.togglePlay}/>}
                    <FaForward className="button"/>
                </h2>

                <h4 className="element">
                    <TimePicker onChange={this.setDate} value={this.state.date}/>
                </h4>
                    
                <h4 className="element">
                    <DatePicker onChange={this.setDate} value={this.state.date}/>
                </h4>
            </div>
        );
    }
}