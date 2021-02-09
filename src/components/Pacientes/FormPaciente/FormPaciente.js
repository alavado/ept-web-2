import React, { useState } from 'react'
import mutation from '../../../graphql/mutations/agregarPaciente'
import uploadMutation from '../../../graphql/mutations/upload'
import query from '../../../graphql/queries/pacientes'
import './FormPaciente.css'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { urltoFile } from '../../../helpers/files'
import Avatar from '../Avatar'

const FormPaciente = () => {

  const [foto, setFoto] = useState(null)
  const [variables, setVariables] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: 'masculino',
    lateralidad: 'diestra',
    fechaDeNacimiento: Date.now(),
    diagnostico: '',
    rut: ''
  })
  const [mutate, { loading }] = useMutation(mutation)
  const [upload] = useMutation(uploadMutation)
  const history = useHistory()

  const cambiarVariable = (e, v) => setVariables({ ...variables, [v]: e.target.value })

  const enviarFormulario = async e => {
    e.preventDefault()
    try {
      if (foto) {
        const file = await urltoFile(foto, 'foto_paciente.jpg', 'image/jpeg')
        const { data: { upload: { id } } } = await upload({ variables: { file } })
        await mutate({
          variables: { ...variables, foto: id },
          refetchQueries: [{ query }]
        })
      }
      else {
        await mutate({
          variables: { ...variables },
          refetchQueries: [{ query }]
        })
      }
      history.push('/pacientes')
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className="FormPaciente">
      <h1 className="FormPaciente__titulo">Ingrese datos paciente</h1>
      <div className="FormPaciente__contenedor_avatar">
        <Avatar
          foto={foto}
          setFoto={setFoto}
          alto={160}
          ancho={160}
        />
      </div>
      <form className="FormPaciente__formulario" onSubmit={enviarFormulario}>
        <label>
          RUT
          <input
            type="text"
            onChange={e => cambiarVariable(e, 'rut')}
          />
        </label>
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
