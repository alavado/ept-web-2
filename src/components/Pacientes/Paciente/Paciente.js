import React from 'react'
import './Paciente.css'
import PerfilPaciente from './PerfilPaciente'
import HistorialPaciente from './HistorialPaciente'

const Paciente = () => {

  return (
    <div className="Paciente">
      <PerfilPaciente />
      <HistorialPaciente />
    </div>
  )
}

export default Paciente
