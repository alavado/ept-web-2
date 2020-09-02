import React, { useState } from 'react'
import Webcam from 'react-webcam'
import './FormPaciente.css'

const FormPaciente = () => {

  const [variables, setVariables] = useState({
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    
  })

  const enviarFormulario = e => {
    e.preventDefault()
  }

  return (
    <div className="FormPaciente">
      <div className="FormPaciente__avatar">
        <Webcam
          width={200}
          height={200}
          videoConstraints={{
            aspectRatio: 1
          }}
        />
      </div>
      <form onSubmit={enviarFormulario}>
        <button type="submit">Agregar</button>
      </form>
    </div>
  )
}

export default FormPaciente
