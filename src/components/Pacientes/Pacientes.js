import React from 'react'
import query from '../../graphql/queries/pacientes'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import FilaPaciente from './FilaPaciente'
import './Pacientes.css'

const Pacientes = () => {

  const { data, loading, error } = useQuery(query)
  const history = useHistory()

  if (loading || error) {
    return null
  }


  return (
    <div className="Pacientes">
      <div className="Pacientes__superior">
        <h1 className="Pacientes__titulo">Seleccione paciente</h1>
        <button onClick={() => history.push('/pacientes/nuevo')}>Agregar paciente</button>
      </div>
      <div className="Pacientes__lista">
        {[...data.pacientes].reverse().map(paciente => (
          <FilaPaciente
            key={paciente.id}
            paciente={paciente}
          />
        ))}
      </div>
    </div>
  )
}

export default Pacientes
