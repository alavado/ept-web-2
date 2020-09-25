import React, { useRef } from 'react'
import GLB from '../../GLB'
import IMUs from '../../IMUs'
import './RegistroEPT.css'
import Webcam from 'react-webcam'

const RegistroEPT = () => {
  
  const webcamRef = React.useRef(null)

  return (
    <div className="RegistroEPT">
      <div className="RegistroEPT__3d">
        {/* <IMUs /> */}
        <GLB />
        <div className="RegistroEPT__camara">
          <Webcam
            videoConstraints={{
              aspectRatio: 1,
              width: 150,
              height: 200,
              facingMode: 'environment'
            }}
            ref={webcamRef}
          />
        </div>
      </div>
    </div>
  )
}

export default RegistroEPT
