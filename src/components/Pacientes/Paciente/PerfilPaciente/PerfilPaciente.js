import React from 'react'
import query from '../../../../graphql/queries/paciente'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import './PerfilPaciente.css'
import { urlArchivo } from '../../../../config/urls'
import { formatearEdad, formatearSexo, formatearLateralidad } from '../../../../helpers/formato'

const PerfilPaciente = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id } })

  if (loading) {
    return null
  }

  const { paciente: {
    nombres, apellido_paterno, apellido_materno, sexo, fecha_nacimiento, lateralidad, diagnostico, foto
  } } = data
  const nombre = `${nombres} ${apellido_paterno} ${apellido_materno}`
  const subtitulo = `${formatearSexo(sexo)}, ${formatearLateralidad(lateralidad, sexo)}, ${formatearEdad(fecha_nacimiento)}`

  return (
    <div className="PerfilPaciente">
      <div className="PerfilPaciente__superior">
        <img
          className="PerfilPaciente__foto"
          alt='foto'
          src={urlArchivo(foto.url)}
        />
        <div className="PerfilPaciente__datos">
          <h2 className="PerfilPaciente__nombre">{nombre}</h2>
          <p className="PerfilPaciente__subtitulo">{subtitulo}</p>
        </div>
      </div>
    </div>
  )
}

export default PerfilPaciente
