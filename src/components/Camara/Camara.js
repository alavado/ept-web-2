import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import './Camara.css'

const Camara = props => {

  const webcamRef = useRef(null)

  return (
    <div className="Camara">
      <Webcam
        videoConstraints={{
          aspectRatio: (window.screen.width / (window.screen.height - 55)),
          width: { min: window.screen.width, max: window.screen.width },
          height: { min: window.screen.height - 55, max: window.screen.height - 55},
          facingMode: 'environment'
        }}
        ref={webcamRef}
      />
      {props.children}
    </div>
  )
}

export default Camara
