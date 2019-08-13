// import React, { Component } from 'react';
// import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
// import 'react-html5-camera-photo/build/css/index.css';
// import axios from 'axios';
//
// class TakePhoto extends Component {
//
//   onTakePhoto = async(dataUri) => {
//
//     const config = {
//       sizeFactor: 1,
//       imgCompression: .5
//     };
//
//
// var data={
//   requests: [
//     {
//       image: {
//           content: dataUri.slice(23),
//       },
//       features: [{
//         type: "TEXT_DETECTION",
//         maxResults: 5
//       }]
//     }
//   ]
// }
//
// await axios({
//     method: 'post',
//     url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCfy0N0DFjJQEUis4VxAGNMSodTyKNSg3Y',
//     data,
//     config: { headers: {'Content-Type': 'multipart/form-data' }}
//   })
//
//   .then(function (response) {
//       //handle success
//
//       console.log(response);
//
//   })
//   .catch(function (error) {
//
//       //handle error
//       console.log(error);
//   });
// }
//
//   onCameraError (error) {
//     console.error('onCameraError', error);
//   }
//
//   onCameraStart (stream) {
//     console.log('onCameraStart');
//   }
//
//   onCameraStop () {
//     console.log('onCameraStop');
//   }
//
//   render () {
//     return (
//       <div className="start-job-container">
//         <Camera
//           onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
//           onCameraError = { (error) => { this.onCameraError(error); } }
//           idealFacingMode = {FACING_MODES.ENVIRONMENT}
//           idealResolution = {{width: 640, height: 480}}
//           imageType = {IMAGE_TYPES.JPG}
//           imageCompression = {0.97}
//           isMaxResolution = {false}
//           isImageMirror = {false}
//           isSilentMode = {true}
//           isDisplayStartCameraError = {true}
//           isFullscreen = {false}
//           sizeFactor = {1}
//           onCameraStart = { (stream) => { this.onCameraStart(stream); } }
//           onCameraStop = { () => { this.onCameraStop(); } }
//         />
//       </div>
//     );
//   }
// }
//
// export default TakePhoto;

// disable chrome on local host
// open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security






import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';

class App extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: ''
    }
  }

  componentDidMount(){
    this.cameraPhoto = new CameraPhoto(this.videoRef.current);

    this.startCameraMaxResolution(FACING_MODES.ENVIRONMENT);
  }

  startCameraMaxResolution (idealFacingMode) {
    this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }

  let dataUri = this.cameraPhoto.getDataUri(config);

  takePhoto = async() => {
    const config = {
      sizeFactor: 1,
      imgCompression: .5
    };


var data={
  requests: [
    {
      image: {
          content: dataUri.slice(23),
      },
      features: [{
        type: "TEXT_DETECTION",
        maxResults: 5
      }]
    }
  ]
}

await axios({
    method: 'post',
    url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCfy0N0DFjJQEUis4VxAGNMSodTyKNSg3Y',
    data,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  })

  .then(function (response) {
      //handle success

      console.log(response);

  })
  .catch(function (error) {

      //handle error
      console.log(error);
  });
}

  stopCamera () {
    this.cameraPhoto.stopCamera()
      .then(() => {
        console.log('Camera stoped!');
      })
      .catch((error) => {
        console.log('No camera to stop!:', error);
      });
  }

  render () {

    return (
      <div className="start-job-container">

        {this.state.dataUri === ''?
        <button onClick={ () => {this.takePhoto() }} className="outer-circle"><button className="inner-circle">
        </button></button> : '' }

        <video
          ref={this.videoRef}
          autoPlay="true"
        />

        {this.state.dataUri === '' ? '' : <img src={this.state.dataUri}/>}

      </div>
    );
  }
}

export default App;
