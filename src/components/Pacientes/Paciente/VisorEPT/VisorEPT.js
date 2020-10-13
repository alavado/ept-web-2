import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import query from '../../../../graphql/queries/ept'
import { useParams } from 'react-router-dom'
import './VisorEPT.css'
import GraficoTemporal from './GraficoTemporal'

const VisorEPT = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id }})
  const [articulacion, setArticulacion] = useState()
  
  if (loading) {
    return null
  }

  const articulaciones = data.registroEpt.datos_imu[0].datos.map(d => d.segmento)
  const datosGrafico = articulacion && data.registroEpt.datos_imu.map(d => ({
    v: d.datos.find(art => art.segmento === articulacion).angulos,
    t: d.t
  }))
  
  return (
    <div className="VisorEPT">
      <video
        src={'https://compsci.cl/ept/' + data.registroEpt.video.url}
        controls={true}
        className="VisorEPT__video"
      />
      <select
        onChange={e => setArticulacion(e.target.value)}
      >
        {articulaciones.map(a => (
          <option key={`option-${a}`} value={a}>{a}</option>
        ))}
      </select>
      <div className="VisorEPT__graficos">
        <GraficoTemporal datos={datosGrafico} />
      </div>
    </div>
  )
}

export default VisorEPT
