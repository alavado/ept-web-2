import React, { useState } from 'react'
import Webcam from 'react-webcam'
import mutation from '../../../graphql/mutations/agregarPaciente'
import './FormPaciente.css'
import { gql, useMutation } from '@apollo/react-hooks'

const UPLOAD = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      id
    }
  }
`;

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

  const [upload] = useMutation(UPLOAD)
  const [image, setImage] = useState(null)

  const cambiarVariable = (e, v) => setVariables({ ...variables, [v]: e.target.value })

  const enviarFormulario = e => {
    e.preventDefault()
    console.log(image)
    upload({
      variables: {
        file: image
      },
    })
    // mutate({
    //   variables: {
    //     ...variables,
    //     foto: webcamRef.current.getScreenshot()
    //   }
    // })
      .then(console.log)
      .catch(console.error)
  }

  return (
    <div className="FormPaciente">
      <h1 className="FormPaciente__titulo">Nuevo paciente</h1>
      <input
        type="file"
        name="files"
        onChange={e => setImage(e.target.files[0])}
        alt="image"
      />
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
