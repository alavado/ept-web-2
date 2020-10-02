import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import { esAndroid } from '../../helpers/devices'
import './Camara.css'

const Camara = props => {

  const webcamRef = useRef(null)

  const { width, height } = window.screen

  return (
    <div className="Camara">
      <Webcam
        videoConstraints={{
          aspectRatio: esAndroid ? (height / (width - 55)) : (width / (height - 55)),
          height: esAndroid() ? width : (height - 55),
          width: esAndroid() ? (height - 55) : width,
          facingMode: 'environment'
        }}
        ref={webcamRef}
      />
      {props.children}
    </div>
  )
}

export default Camara
