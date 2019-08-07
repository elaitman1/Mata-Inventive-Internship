import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import axios from 'axios';

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

  takePhoto = async() =>{
    const config = {
      sizeFactor: 1,
      imgCompression: .5
    };

    let dataUri = this.cameraPhoto.getDataUri(config);
    await this.setState({ dataUri });
///////////////////////////////////////////////////////////////////

var data={
  requests: [
    {
      image: {
          content: dataUri.slice(22),
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
    this.stopCamera()
    debugger
      //handle success
      console.log(response);
  })
  .catch(function (error) {

      //handle error
      console.log(error);
  });
}


    // Content-Security-Policy: script-src 'self' https://apis.google.com
    // <meta http-equiv="Content-Security-Policy" content="default-src 'self'">


 // var b=JSON.stringify({"requests":[{ "image":{  "source":{"imageUri":"https://www.mtansw.com.au/site/DefaultSite/filesystem/images/shop/Workshop-Items/204_WorkshopItems_A5SizeJobCards.png"}} , "features": [{"type":"TEXT_DETECTION","maxResults":5}]  } ]});
 // var e=new XMLHttpRequest;
 // e.onload=function(){console.log(e.responseText)};
 // e.open("POST","https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAPAA-x3y147JdXMGX-rRRHArgTkci8m_g",!0);
 // e.send(b)




/////////////////////////////////////////////////
    // AIzaSyAPAA-x3y147JdXMGX-rRRHArgTkci8m_g 	this is the api

  stopCamera () {
    debugger
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
} //end of class

export default App;


// videoElement.nextSibling.outerHTML
//after photo is taken this the path where the photo will be












// <button onClick={ () => {
//   let facingMode = FACING_MODES.USER;
//   this.startCamera(facingMode, {});
// }}> Start user facingMode resolution default </button>
