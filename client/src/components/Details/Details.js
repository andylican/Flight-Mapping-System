import React from "react";

import { FaPlane, FaClock, FaRegWindowClose } from "react-icons/fa";
import { Layout, Divider } from "antd";
import "./Details.css";

const { Sider } = Layout;

const Details = props => {
    return (
        <Sider width={250} className="details" style={{backgroundColor: "white"}}>
            <h1 id="close" onClick={props.toggle}><FaRegWindowClose/></h1>
            <h1 className="title"><FaPlane size={40} style={{transform: `rotate(-90deg)`}}/> CFC4001</h1>
            <Divider style={{borderColor: "black", borderWidth: 3}}/>

            <div className="departArrival">
                <div className="info">
                    <h1>Departure</h1>
                    <h2>CYYZ</h2>
                    <h2 className="subTitle"><FaClock/> 13:10</h2>
                </div>
                <div className="info">
                    <h1>Arrival</h1>
                    <h2>CYBW</h2>
                    <h2 className="subTitle"><FaClock/> 18:10</h2>
                </div>
            </div>

            <Divider style={{borderColor: "black", borderWidth: 3}}/>
            <h1 className="row"><b>Latitude:</b>  52.2782</h1>
            <h1 className="row"><b>Longitude:</b> -93.7683</h1>
            <h1 className="row"><b>Altitude:</b> 40000 ft</h1>
            <h1 className="row"><b>Speed:</b> 1100 km/h</h1>
        </Sider>
    )
}

export default Details;