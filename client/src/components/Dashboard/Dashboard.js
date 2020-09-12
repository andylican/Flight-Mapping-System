import React, {Component} from "react";
import "./Dashboard.css";

import {
    Dropdown,
    DropdownButton,
    InputGroup,
    FormControl,
    Badge
} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
import {
    FaPlane,
    FaHelicopter,
    FaBackward,
    FaForward,
    FaPlay,
    FaPause,
    FaClock,
    FaRegCalendar
} from "react-icons/fa";

export default class Dashboard extends Component {
    state = {
        title: "All Aircraft",
        playSpeed: 1,
        play: false
    }

    togglePlay = () => {
        this.setState(prevState => ({play: !prevState.play}));
    }

    render() {
        return (
            <div id="dashboard">
                <DropdownButton id={"dropdown-button-drop-up"} className="element" drop="up" variant="secondary" title={this.state.title}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><BsSearch/></InputGroup.Text>
                        </InputGroup.Prepend>

                        <FormControl
                        placeholder="Aircraft Code"
                        aria-label="Aircraft"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <Dropdown.Item eventKey="1"><FaPlane/> <FaHelicopter/> All Aircraft</Dropdown.Item>
                    <Dropdown.Item eventKey="2"><FaPlane/> Airplanes</Dropdown.Item>
                    <Dropdown.Item eventKey="3"><FaHelicopter/> Helicopters</Dropdown.Item>
                </DropdownButton>

                <h2 className="element">
                    <Badge variant="secondary">x {this.state.playSpeed}</Badge>
                </h2>

                <h2 className="element">
                    <FaBackward className="button"/>
                    {!this.state.play ? <FaPlay className="button" onClick={this.togglePlay}/>
                    : <FaPause className="button" onClick={this.togglePlay}/>}
                    <FaForward className="button"/>
                </h2>

                <h2 className="element">
                    <FaClock/> 17:00:00
                </h2>
                
                <h2 className="element">
                    <FaRegCalendar/> 9/11/2020
                </h2>
            </div>
        );
    }
}