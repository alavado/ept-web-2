import React from 'react'
import './FilaPaciente.css'

const FilaPaciente = ({ paciente }) => {
  return (
    <div className="FilaPaciente">
      {paciente.nombres.split(' ')[0]} {paciente.apellido_paterno}
    </div>
  )
}

export default FilaPaciente
