import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import query from '../../../../graphql/queries/ept'
import { useParams } from 'react-router-dom'
import './VisorEPT.css'
import GraficoTemporal from './GraficoTemporal'

const VisorEPT = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id }})
  
  if (loading) {
    return null
  }
  
  return (
    <div className="VisorEPT">
      <div className="VisorEPT__contenedor_izquierda">
        <video
          src={'https://compsci.cl/ept/' + data.registroEpt.video.url}
          controls={true}
          className="VisorEPT__video"
        />
      </div>
      <div>
        <a href={`https://compsci.cl/ept/${data.registroEpt.datos_imu.url}`} rel="noreferrer noopener" target="_blank">Descargar datos IMU</a>
      </div>
      <div>
        <a href={`https://compsci.cl/ept/${data.registroEpt.datos_emg.url}`} rel="noreferrer noopener" target="_blank">Descargar datos EMG</a>
      </div>
    </div>
  )
}

export default VisorEPT
