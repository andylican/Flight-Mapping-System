import React, { useEffect, useState} from 'react';
import AircraftMap from "./components/AircraftMap/AircraftMap";
import Dashboard from "./components/Dashboard/Dashboard";

import './App.css';
import moment from 'moment';
import { Layout } from 'antd';
import { getFlights } from './services/flights';
import Sider from './components/Sider/Sider';

function App() {
  const [date, setDate] = useState(moment("09/15/2020").utc(false));
  const [flights, setFlights] = useState([]);
  const [flight, setFlight] = useState({}); // format: {flight: object, leg: number}
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const [center, setCenter] = useState([49.8951, -97.1384]);
  const [selected, setSelected] = useState(false); //If an aircraft is selected or not

  const setCurrFlight = (toSet) => {
    console.log(toSet.flight);
    setFlight(toSet);
    setSiderCollapsed(false);
  }

  const selectAircraft = (flight, leg) => { //OnClick event handler for aircraft
    flights.forEach(air => {
        if (air.id !== flight.id) {
            air.legs.forEach(l => l.selected = false);
        } else {
            air.legs.forEach(l => {
                if (l !== leg) {
                    l.selected = false;
                } else {
                    l.selected = true;
                }
            })
        }
    });

    setSelected(true);
  }

  const exit = () => { //Exiting sidebar
    setSelected(false);
    setFlight({});
    flights.forEach(air => {
      air.legs.forEach(leg => {
        leg.selected = true;
      });
    });
  }

  useEffect(() => {
    getFlights().then(res => {
      let flights = res.data;
      flights.forEach(flight => {
        flight.legs.forEach(leg => {
          leg.selected = true;
        });
      });

      setFlights(flights);
    });
  }, []);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsed={siderCollapsed} date={date} setDate={setDate} setCollapsed={setSiderCollapsed} currFlight={flight} exit={exit}/>
      <Layout.Content style={{height: '90vh'}}>
        <AircraftMap setCenter={setCenter} center={center} date={date} setCurrFlight={setCurrFlight} flights={flights} selectAircraft={selectAircraft} selected={selected}/>
      </Layout.Content>
      <Dashboard siderCollapsed={siderCollapsed} setCurrFlight={setCurrFlight} selectAircraft={selectAircraft}
      setCenter={setCenter} date={date} flights={flights} setDate={setDate} currFlight={flight}/>
    </Layout>
  );
}

export default App;
