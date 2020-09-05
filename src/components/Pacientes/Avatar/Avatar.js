import React, { useState } from 'react'
import { Icon, InlineIcon } from '@iconify/react'
import IconoCamara from '@iconify/icons-ic/camera-alt'
import Webcam from 'react-webcam'
import './Avatar.css'

const Avatar = ({ foto, setFoto, alto: height, ancho: width }) => {

  const webcamRef = React.useRef(null)
  const [tomandoFoto, setTomandoFoto] = useState(false)

  return (
    <div className="Avatar">
      {tomandoFoto ?
        <>
          <div className="Avatar__contenedor_camara" style={{ width, height }}>
            <Webcam
              videoConstraints={{
                aspectRatio: 1,
                width,
                height,
                facingMode: 'environment'
              }}
              ref={webcamRef}
            />
          </div>
          <button
            className="Avatar__boton_tomar_foto"
            onClick={() => {
              setFoto(webcamRef.current.getScreenshot())
              setTomandoFoto(false)
            }}
          >
            <InlineIcon icon={IconoCamara} />
          </button>
        </> :
        <div
          className="Avatar__boton_agregar_foto"
          onClick={() => setTomandoFoto(true)}
        >
          {foto ? 
            <img
              className="Avatar__foto"
              src={foto}
              alt="Foto paciente"
              style={{ width, height }}
            /> :
            <>
              <Icon
                className="Avatar__icono_agregar_foto"
                icon={IconoCamara}
              />
              <div className="Avatar__texto_agregar_foto">
                Agregar foto
              </div>
            </>
          }
        </div>
      }
    </div>
  )
}

export default Avatar
