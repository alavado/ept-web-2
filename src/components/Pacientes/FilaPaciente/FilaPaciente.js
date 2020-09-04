import React from 'react'
import './FilaPaciente.css'
import { urlArchivo } from '../../../config/urls'
import { useHistory } from 'react-router-dom'

const FilaPaciente = ({ paciente }) => {

  const nombreCompleto = `${paciente.nombres.split(' ')[0]} ${paciente.apellido_paterno}`
  const history = useHistory()

  return (
    <div
      className="FilaPaciente"
      onClick={() => history.push(`/pacientes/${paciente.id}`)}
    >
      <img
        className="FilaPaciente__avatar"
        alt={`Foto Paciente ${nombreCompleto}`}
        src={paciente.foto ? urlArchivo(paciente.foto.url) : ''}
      />
      {nombreCompleto}
    </div>
  )
}

export default FilaPaciente
