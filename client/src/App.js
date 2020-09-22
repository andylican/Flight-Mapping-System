import React, {useEffect, useState} from 'react';
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
  const [currFlight, setCurrFlight] = useState({}); // format: {flight: object, leg: number}
  const [siderCollapsed, setSiderCollapsed] = useState(true);

  useEffect(() => {
    getFlights().then(res => setFlights(res.data));
  }, []);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsed={siderCollapsed} setCollapsed={setSiderCollapsed} currFlight={currFlight}/>
      <Layout.Content style={{height: '90vh'}}>
        <AircraftMap date={date} setCurrFlight={setCurrFlight} flights={flights}/>
      </Layout.Content>
      <Dashboard siderCollapsed={siderCollapsed} setCurrFlight={setCurrFlight} date={date} flights={flights} setDate={setDate}/>
    </Layout>
  );
}

export default App;
