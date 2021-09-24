import React from 'react'
import './FilaPaciente.css'
import { urlArchivo, urlSinFoto } from '../../../config/urls'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { seleccionaPaciente } from '../../../redux/ducks/proyecto'

const FilaPaciente = ({ paciente }) => {

  const nombreCompleto = `${paciente.nombres.split(' ')[0]} ${paciente.apellido_paterno}`
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <div
      className="FilaPaciente"
      onClick={() => {
        dispatch(seleccionaPaciente(paciente))
        history.push(`/pacientes/${paciente.id}`)
      }}
    >
      <img
        className="FilaPaciente__avatar"
        alt={`Foto Paciente ${nombreCompleto}`}
        src={paciente.foto ? urlArchivo(paciente.foto.url) : urlSinFoto}
      />
      {nombreCompleto}
    </div>
  )
}

export default FilaPaciente
