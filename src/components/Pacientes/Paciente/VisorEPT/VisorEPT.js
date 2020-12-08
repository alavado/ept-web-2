import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from '../../../../graphql/queries/ept'
import { useParams } from 'react-router-dom'
import './VisorEPT.css'
import axios from 'axios'
import { formatearCuaternionMMR, euler, calcularCuaternionRelativo, corregirCuaternion } from '../../../../helpers/rotaciones'
import GraficosEMG from './GraficosEMG'
import GraficosIMU from './GraficosIMU'
import Skeleton from 'react-loading-skeleton'

const VisorEPT = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id }})
  const [descargando, setDescargando] = useState(true)
  const [datosEMG, setDatosEMG] = useState([])
  const [datosIMU, setDatosIMU] = useState([])

  useEffect(() => {
    if (data) {
      axios.get(`https://compsci.cl/ept/${data.registroEpt.datos_emg?.url}`, { responseType: 'text' })
        .then(res => {
          const { data: { grabacionIMU, grabacionEMG, macs, correcciones } } = res
          //const [correccionTorso, correccionHombro, correccionCodo, correccionMuñeca] = correcciones
          const dataReducida = grabacionIMU.slice(1).reduce((arr, punto) => {
            return arr[arr.length - 1][0] !== punto[0] ? [...arr, punto] : arr
          }, [grabacionIMU[0]])
          const datosSincronizados = dataReducida.map((d, i) => {
            const rotaciones = []
            let j = i
            while (rotaciones.length < Object.keys(macs).length && j >= 0) {
              const [mac, w, x, y, z] = dataReducida[j--]
              let cuaternion = formatearCuaternionMMR([w, x, y, z])
              if (correcciones[i]) {
                cuaternion = corregirCuaternion(cuaternion, correcciones[i], i === 0)
              }
              if (!rotaciones.find(r => r.mac === mac)) {
                rotaciones.push({ mac, cuaternion, angulosAbsolutos: euler(cuaternion) })
              }
            }
            return {
              ts: d[5],
              rotaciones
            }
          }).filter(d => d.rotaciones.length === Object.keys(macs).length)
          console.log(correcciones)
          const angulos = datosSincronizados.map((d, i) => {
            const { rotaciones, ts } = d
            const { cuaternion: cuaternionTorso} = rotaciones.find(r => r.mac === macs.macTronco)
            const { cuaternion: cuaternionHombro } = rotaciones.find(r => r.mac === macs.macHombro)
            const { cuaternion: cuaternionCodo } = rotaciones.find(r => r.mac === macs.macCodo)
            const { cuaternion: cuaternionMuñeca } = rotaciones.find(r => r.mac === macs.macMuñeca)
            const cuaternionRelativoTorso = calcularCuaternionRelativo([cuaternionTorso])
            const cuaternionRelativoHombro = calcularCuaternionRelativo([cuaternionTorso, cuaternionHombro])
            const cuaternionRelativoCodo = calcularCuaternionRelativo([cuaternionTorso, cuaternionHombro, cuaternionCodo])
            const cuaternionRelativoMuñeca = calcularCuaternionRelativo([cuaternionTorso, cuaternionHombro, cuaternionCodo, cuaternionMuñeca])
            return {
              ts: Number(ts),
              torso: euler(cuaternionRelativoTorso),
              hombro: euler(cuaternionRelativoHombro),
              codo: euler(cuaternionRelativoCodo),
              muñeca: euler(cuaternionRelativoMuñeca)
            }
          })
          setDatosIMU(angulos)
          setDatosEMG(grabacionEMG.map(g => {
            const [emg1, emg2, emg3, emg4, ts] = g.split(',')
            return {
              ts: Number(ts),
              emg1: Number(emg1),
              emg2: Number(emg2),
              emg3: Number(emg3),
              emg4: Number(emg4)
            }
          }))
          setDescargando(false)
        })
    }
  }, [data])
  
  if (loading) {
    return null
  }
  
  return (
    <div className="VisorEPT">
      {descargando
        ? <Skeleton count={7} />
        : <>
            <GraficosEMG datos={datosEMG} />
            <GraficosIMU datos={datosIMU} />
          </>
      }
      {/* <video
        src={'https://compsci.cl/ept/' + data.registroEpt.video.url}
        controls={true}
        className="VisorEPT__video"
      />
      {descargando && <div>Descargando datos...</div>} */}
      <div>
        <a href={`https://compsci.cl/ept/${data.registroEpt.datos_emg?.url}`} rel="noreferrer noopener" target="_blank">Descargar datos EMG</a>
      </div>
    </div>
  )
}

export default VisorEPT
