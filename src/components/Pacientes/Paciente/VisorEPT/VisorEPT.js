import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from '../../../../graphql/queries/ept'
import { useParams } from 'react-router-dom'
import './VisorEPT.css'
import GraficoTemporal from './GraficoTemporal'
import axios from 'axios'
import { graba } from '../../../../redux/ducks/sensores'

const VisorEPT = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id }})
  const [descargando, setDescargando] = useState(true)

  useEffect(() => {
    if (data) {
      axios.get(`https://compsci.cl/ept/${data.registroEpt.datos_emg?.url}`, { responseType: 'text' })
        .then(res => {
          const { data: { grabacionIMU, grabacionEMG, macs, correcciones } } = res
          console.log({grabacionEMG})
          console.log({grabacionIMU})
          console.log({correcciones})
          const dataReducida = grabacionIMU.slice(1).reduce((arr, punto) => {
            return arr[arr.length - 1][0] !== punto[0] ? [...arr, punto] : arr
          }, [grabacionIMU[0]])
          console.log({dataReducida})
          const datosSincronizados = dataReducida.map((d, i) => {
            const rotaciones = []
            let j = i
            while (rotaciones.length < Object.keys(macs).length && j >= 0) {
              const [mac, x, y, z, w] = dataReducida[j--]
              if (!rotaciones.find(r => r.mac === mac)) {
                rotaciones.push({ mac, x, y, z, w })
              }
            }
            return {
              ts: d[5],
              rotaciones
            }
          })
          console.log({datosSincronizados})
          setDescargando(false)
        })
    }
  }, [data])
  
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
        {descargando && <div>Descargando datos...</div>}
      </div>
      <div>
        <a href={`https://compsci.cl/ept/${data.registroEpt.datos_emg?.url}`} rel="noreferrer noopener" target="_blank">Descargar datos EMG</a>
      </div>
    </div>
  )
}

export default VisorEPT
