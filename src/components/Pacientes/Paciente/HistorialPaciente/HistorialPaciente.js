import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import query from '../../../../graphql/queries/paciente'
import './HistorialPaciente.css'
import TarjetaHistorial from './TarjetaHistorial'

const HistorialPaciente = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id } })

  if (loading || data.paciente.registro_epts.length === 0) {
    return null
  }

  return (
    <div className="HistorialPaciente">
      <h2 className="HistorialPaciente__titulo">Historial</h2>
      {data.paciente.registro_epts
        .slice()
        .sort((r1, r2) => r1.createdAt > r2.createdAt ? -1 : 1)
        .map(registro => (
          <TarjetaHistorial
            key={`tarjeta-historial-${registro.id}`}
            registro={registro}
          />
      ))}
    </div>
  )
}

export default HistorialPaciente
