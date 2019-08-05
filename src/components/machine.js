import React, { Component } from "react";
import StartJob from "./startJob";
// import PreparationChecklist from "./preparationChecklist";
import Inspection from "./inspection";
// import Timer from "./timer";
import TakePhoto from './TakePhoto'

export default class Machine extends Component {
  state = {
    machine: this.props.machine,
    selectedTask: null,
    cameraView: false
  }

  returnToMain = () => {
    this.props.deselectMachine();
    this.props.toggleMachineSelection();
  }

  displayTask = (task) => {
    return () => {
      this.setState({ selectedTask: task })
    }
  }

  hideTask = () => {
    this.setState({ selectedTask: null })
  }

  toggleCamera = () => {
    this.setState({ cameraView: !this.state.cameraView })
  }

  renderTask = () => {
    if (this.state.cameraView){
      return <TakePhoto
      toggleCamera={this.toggleCamera}
      />
    }
    switch (this.state.selectedTask) {
      case "Start Job":
        return <StartJob
        toggleCamera={this.toggleCamera}
        cameraView={this.state.cameraView}
        hideTask={this.hideTask}
        />

      // case "Preparation Checklist":
      //   return <PreparationChecklist />
      case "Inspection":
        return <Inspection hideTask={this.hideTask} />
      // case "Timer":
      //   return <Timer />
      default:
        return "";
    }
  }

  render = () => {
    const buttonTypes = ["Start Job", "Preparation Checklist", "Inspection", "Timer"];

    return (
      <div className="machine-container">
        <span className="machine-back" onClick={this.returnToMain}>&lsaquo;</span>
        <h1 className="machine-name">{this.state.machine.type} {this.state.machine.id}</h1>
        <img src="./assets/machine.png" alt="MachinePNG" />
        <div className="machine-buttons-container">
          {buttonTypes.map((butTyp, idx) => (
            <Button
              key={idx}
              type={butTyp}
              displayTask={this.displayTask}
            />
          ))}
        </div>
        <div>
          {
            !this.state.selectedTask ?
              "" :
              this.renderTask()
          }
        </div>
      </div>
    )
  }
}

const Button = (props) => {
  return (
    <div className="machine-button-container" onClick={props.displayTask(props.type)}>
      <p>{props.type}</p>
    </div>
  )
}
