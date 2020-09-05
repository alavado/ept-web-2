import React, { useState } from 'react'
import query from '../../../../graphql/queries/paciente'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import './PerfilPaciente.css'
import { urlArchivo, urlSinFoto } from '../../../../config/urls'
import { formatearEdad, formatearSexo, formatearLateralidad } from '../../../../helpers/formato'
import Avatar from '../../Avatar'

const PerfilPaciente = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id } })
  const [foto, setFoto] = useState(data?.paciente.foto?.url)

  if (loading) {
    return null
  }

  const { paciente: {
    nombres, apellido_paterno, apellido_materno, sexo, fecha_nacimiento, lateralidad, diagnostico
  } } = data
  const nombre = `${nombres} ${apellido_paterno} ${apellido_materno}`
  const subtitulo = `${formatearSexo(sexo)}, ${formatearLateralidad(lateralidad, sexo)}, ${formatearEdad(fecha_nacimiento)}`

  const editarPaciente = (variable, valor) => {
    
  }

  return (
    <div className="PerfilPaciente">
      <div className="PerfilPaciente__superior">
        <div className="PerfilPaciente__foto">
          <Avatar
            foto={data?.paciente.foto ? urlArchivo(data.paciente.foto.url) : urlSinFoto}
            setFoto={setFoto}
            alto={120}
            ancho={120}
          />
        </div>
        <div className="PerfilPaciente__datos">
          <h2 className="PerfilPaciente__nombre">{nombre}</h2>
          <p className="PerfilPaciente__subtitulo">{subtitulo}</p>
        </div>
      </div>
      <div className="PerfilPaciente__contenedor_diagnostico">
        <h2 className="PerfilPaciente__titulo_diagnostico">Diagnóstico</h2>
        <p className="PerfilPaciente__diagnostico">{diagnostico}</p>
      </div>
    </div>
  )
}

export default PerfilPaciente
