import React, { Component } from 'react';
import Navbar from "./components/navbar";
import Overview from "./components/overview";
import Floormap from "./components/floormap";
import Footer from "./components/footer";
import './App.css';

export default class App extends Component {
  state = {
    viewSelected: "overview",
    machineSelected: false
  }

  selectView = (view) => {
    this.setState({ viewSelected: view })
  }

  toggleMachineSelection = () => {
    this.setState({ machineSelected: !this.state.machineSelected })
  }

  render = () => {
    return (
      <div>
        <Navbar />
        {
          this.state.viewSelected === "overview" ?
            <Overview
              toggleMachineSelection={this.toggleMachineSelection}
            /> :
            <Floormap />
        }
        {
          !this.state.machineSelected ?
            <Footer
              viewSelected={this.state.viewSelected}
              selectView={this.selectView}
            /> :
            ""
        }
      </div>
    );
  }
}
