import React, { useState } from 'react'
import Webcam from 'react-webcam'
import mutation from '../../../graphql/mutations/agregarPaciente'
import uploadMutation from '../../../graphql/mutations/upload'
import './FormPaciente.css'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

const urltoFile = (url, filename, mimeType) => fetch(url)
  .then(res => res.arrayBuffer())
  .then(buf => new File([buf], filename, { type: mimeType }))

const FormPaciente = () => {

  const webcamRef = React.useRef(null);
  const [variables, setVariables] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: 'masculino',
    lateralidad: 'diestra',
    fechaDeNacimiento: Date.now(),
    diagnostico: ''
  })
  const [mutate, { loading }] = useMutation(mutation)
  const [upload, { loading: uploading }] = useMutation(uploadMutation)
  const history = useHistory()

  const cambiarVariable = (e, v) => setVariables({ ...variables, [v]: e.target.value })

  const enviarFormulario = async e => {
    e.preventDefault()
    try {
      const file = await urltoFile(webcamRef.current.getScreenshot(), 'bla.jpg', 'image/jpg')
      const { data: { upload: { id } } } = await upload({ variables: { file } })
      const dataPaciente = await mutate({ variables: { ...variables, foto: id } })
      history.push('/pacientes')
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className="FormPaciente">
      <h1 className="FormPaciente__titulo">Nuevo paciente</h1>
      <div className="FormPaciente__avatar">
        <Webcam
          videoConstraints={{
            aspectRatio: 1,
            width: 200,
            height: 200,
          }}
          ref={webcamRef}
        />
      </div>
      <form className="FormPaciente__formulario" onSubmit={enviarFormulario}>
        <label>
          Nombres
          <input
            type="text"
            onChange={e => cambiarVariable(e, 'nombres')}
          />
        </label>
        <label>
          Apellido paterno
          <input
            type="text"
            onChange={e => cambiarVariable(e, 'apellidoPaterno')}
          />
        </label>
        <label>
          Apellido materno
          <input
            type="text"
            onChange={e => cambiarVariable(e, 'apellidoMaterno')}
          />
        </label>
        <label>
          Fecha de nacimiento
          <input
            type="date"
            onChange={e => cambiarVariable(e, 'fechaDeNacimiento')}
          />
        </label>
        <label>
          Sexo
          <label>
            <input
              type="radio"
              name="sexo"
              value="masculino"
              checked={variables.sexo === 'masculino'}
              onChange={e => cambiarVariable(e, 'sexo')}
            />
            Masculino
          </label>
          <label>
            <input
              type="radio"
              name="sexo"
              value="femenino"
              checked={variables.sexo === 'femenino'}
              onChange={e => cambiarVariable(e, 'sexo')}
            />
            Femenino
          </label>
        </label>
        <label>
          Lateralidad
          <label>
            <input
              type="radio"
              name="lateralidad"
              value="diestra"
              checked={variables.lateralidad === 'diestra'}
              onChange={e => cambiarVariable(e, 'lateralidad')}
            />
            Diestra
          </label>
          <label>
            <input
              type="radio"
              name="lateralidad"
              value="zurda"
              checked={variables.lateralidad === 'zurda'}
              onChange={e => cambiarVariable(e, 'lateralidad')}
            />
            Zurda
          </label>
        </label>
        <label>
          <label>Diagnóstico</label>
          <input
            type="text"
            onChange={e => cambiarVariable(e, 'diagnostico')}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
        >
          Agregar
        </button>
      </form>
    </div>
  )
}

export default FormPaciente
