import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import './Camara.css'

const Camara = props => {

  const webcamRef = useRef(null)

  return (
    <div className="Camara">
      <Webcam
        videoConstraints={{
          aspectRatio: 1,
          width: window.screen.width,
          height: window.screen.height - 55,
          facingMode: 'environment'
        }}
        ref={webcamRef}
      />
      {props.children}
    </div>
  )
}

export default Camara
