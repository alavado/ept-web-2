import React, { useEffect, useState, useMemo } from 'react'
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
  const [error, setError] = useState()

  useEffect(() => {
    if (data) {
      axios.get(`https://compsci.cl/ept/${data.registroEpt.datos_emg?.url}`, { responseType: 'text' })
        .then(res => {
          const { data: { grabacionIMU, grabacionEMG, macs, correcciones } } = res
          const dataReducida = grabacionIMU.reduce((arr, punto) => {
            return arr[arr.length - 1][0] !== punto[0] ? [...arr, punto] : arr
          }, [grabacionIMU[0]])
          const datosSincronizados = dataReducida.map((d, i) => {
            const rotaciones = []
            let j = i
            while (rotaciones.length < Object.keys(macs).length && j >= 0) {
              const [mac, w, x, y, z] = dataReducida[j--]
              if (!rotaciones.find(r => r.mac === mac)) {
                let cuaternion = formatearCuaternionMMR([w, x, y, z])
                const indiceMac = Object.keys(macs).findIndex(m => macs[m] === mac)
                cuaternion = corregirCuaternion(cuaternion, correcciones[indiceMac], indiceMac === 0)
                rotaciones.push({ mac, cuaternion, angulosAbsolutos: euler(cuaternion) })
              }
            }
            return {
              ts: d[5],
              rotaciones
            }
          }).filter(d => d.rotaciones.length === Object.keys(macs).length)
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
        .catch(err => setError('Datos no encontrados'))
    }
  }, [data])

  const datosIMUCSV = useMemo(() => {
    if (!datosIMU) {
      return ''
    }
    return 't,hombro_x,hombro_y,hombro_z,codo_x,codo_y,codo_z,muñeca_x,muñeca_y,muñeca_z\r\n'
      + datosIMU.map(v => {
          const { hombro, codo, muñeca, ts } = v
          const [xh, yh, zh] = hombro
          const [xc, yc, zc] = codo
          const [xm, ym, zm] = muñeca
          return [ts, xh, yh, zh, xc, yc, zc, xm, ym, zm].join(',')
        }).join('\r\n')
  }, [datosIMU])

  const datosEMGCSV = useMemo(() => {
    if (!datosEMG) {
      return ''
    }
    return 't,emg1,emg2,emg3,emg4\r\n'
      + datosEMG.map(v => {
          const { emg1, emg2, emg3, emg4, ts } = v
          return [ts, emg1, emg2, emg3, emg4].join(',')
        }).join('\r\n')
  }, [datosEMG])

  if (error) {
    return error
  }

  const descargar = (datos, fname) => {
    const data = 'data:text/csv;charset=utf-8,' + encodeURIComponent(datos)
    const a = document.getElementById('downloadAnchorElem')
    a.setAttribute('href', data)
    a.setAttribute('download', fname)
    a.click();
  }
  
  if (loading) {
    return null
  }
  
  return (
    <div className="VisorEPT">
      {descargando
        ? <Skeleton count={7} style={{ margin: '1rem' }} />
        : <div className="VisorEPT__contenedor">
            <div className="VisorEPT__contenedor_video">
              <video
                src={'https://compsci.cl/ept/' + data.registroEpt.video.url}
                controls={true}
                className="VisorEPT__video"
              />
              <div className="VisorEPT__botones">
                <button
                  className="VisorEPT__boton"
                  onClick={() => descargar(datosEMGCSV, 'emg.csv')}
                >
                  Descargar EMG
                </button>
                <button
                  className="VisorEPT__boton"
                  onClick={() => descargar(datosIMUCSV, 'imu.csv')}
                >
                  Descargar IMU
                </button>
              </div>
            </div>
            <div className="VisorEPT__graficos">
              <GraficosEMG datos={datosEMG} />
              <GraficosIMU datos={datosIMU} />
            </div>
            <a href="#download" id="downloadAnchorElem" style={{ display: 'none' }}>&nbsp;</a>
          </div>
      }
      {/* <video
        src={'https://compsci.cl/ept/' + data.registroEpt.video.url}
        controls={true}
        className="VisorEPT__video"
      />
      {descargando && <div>Descargando datos...</div>} */}
      {/* <div>
        <a href={`https://compsci.cl/ept/${data.registroEpt.datos_emg?.url}`} rel="noreferrer noopener" target="_blank">Descargar datos EMG</a>
      </div> */}
    </div>
  )
}

export default VisorEPT
