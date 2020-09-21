import React, {useState} from 'react';
import AircraftMap from "./components/AircraftMap/AircraftMap";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css';
import moment from 'moment';
import { Layout } from 'antd';

function App() {
  const [date, setDate] = useState(moment("09/15/2020").utc(false));
  return (
    <Layout>
      <Layout.Content style={{height: '90vh'}}>
        <AircraftMap date={date}/>
      </Layout.Content>
      <Dashboard date={date} setDate={setDate}/>
    </Layout>
  );
}

export default App;
