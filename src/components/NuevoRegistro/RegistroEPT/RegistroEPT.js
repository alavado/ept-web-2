import React, { useState, useRef } from 'react'
import GLB from '../../GLB'
import IMUs from '../../IMUs'
import './RegistroEPT.css'
import Webcam from 'react-webcam'
import classNames from 'classnames'
import Draggable from 'react-draggable'

const RegistroEPT = () => {
  
  const [mostrar3d, setMostrar3d] = useState(true)
  const webcamRef = useRef(null)

  return (
    <div className="RegistroEPT">
      <div className="RegistroEPT__camara">
        {/* <h1 className="RegistroEPT__camara__titulo">Cámara</h1> */}
        <Webcam
          videoConstraints={{
            aspectRatio: 1,
            width: window.screen.width,
            height: window.screen.height - 55,
            facingMode: 'environment'
          }}
          ref={webcamRef}
        />
        <div className="RegistroEPT__UI">
          <button onClick={() => setMostrar3d(!mostrar3d)}>
            3D
          </button>
        </div>
        <Draggable handle=".RegistroEPT__3d_titulo">
          <div className={classNames({
            RegistroEPT__3d: true,
            'RegistroEPT__3d--activo': mostrar3d
          })}>
            {/* <IMUs /> */}
            <h1 className="RegistroEPT__3d_titulo">Vista 3D</h1>
            <GLB />
          </div>
        </Draggable>
      </div>
    </div>
  )
}

export default RegistroEPT
