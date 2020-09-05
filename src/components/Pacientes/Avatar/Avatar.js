import React, { useState } from 'react'
import { Icon, InlineIcon } from '@iconify/react'
import IconoCamara from '@iconify/icons-ic/baseline-add-a-photo'
import Webcam from 'react-webcam'

const Avatar = ({ foto, setFoto }) => {

  const webcamRef = React.useRef(null)
  const [tomandoFoto, setTomandoFoto] = useState(false)

  return (
    <div>
      {tomandoFoto ?
        <>
          <div className="FormPaciente__contenedor_camara">
            <Webcam
              videoConstraints={{
                aspectRatio: 1,
                width: 180,
                height: 180,
                facingMode: 'environment'
              }}
              ref={webcamRef}
            />
          </div>
          <button
            className="FormPaciente__boton_tomar_foto"
            onClick={() => {
              setFoto(webcamRef.current.getScreenshot())
              setTomandoFoto(false)
            }}
          >
            <InlineIcon icon={IconoCamara} />
          </button>
        </> :
        <div
          className="FormPaciente__boton_agregar_foto"
          onClick={() => setTomandoFoto(true)}
        >
          {foto ? 
            <img
              className="FormPaciente__foto"
              src={foto}
              alt="Foto paciente"
            /> :
            <>
              <Icon
                className="FormPaciente__icono_agregar_foto"
                icon={IconoCamara}
              />
              <div className="FormPaciente__texto_agregar_foto">
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
