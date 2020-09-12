import React, {Component} from 'react';
import AircraftMap from "./components/AircraftMap/AircraftMap";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AircraftMap/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
