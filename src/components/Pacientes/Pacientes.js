import React from 'react'
import query from '../../graphql/queries/pacientes'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import FilaPaciente from './FilaPaciente'
import './Pacientes.css'

const Pacientes = () => {

  const { data, loading, error } = useQuery(query)

  if (loading || error) {
    return null
  }

  return (
    <div className="Pacientes">
      <div className="Pacientes__lista">
        {data.pacientes.map(paciente => (
          <FilaPaciente
            key={paciente.id}
            paciente={paciente}
          />
        ))}
      </div>
      <Link to="/pacientes/nuevo">Agregar paciente</Link>
    </div>
  )
}

export default Pacientes
