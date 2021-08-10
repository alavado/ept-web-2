import React, { useState } from 'react'
import { InlineIcon } from '@iconify/react'
import close from '@iconify/icons-mdi/close'
import './ModalAnalisis.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import TablaEPT from './TablaEPT'
import TablaKine from './TablaKine'

const estadoInicial = {
  inicio: 0,
  termino: 0,
  etiqueta: '',
  canal: 1,
  inicioRef: 0,
  terminoRef: 0,
  canalRef: 1
}

const ModalAnalisis = ({ esconder, emg, imu }) => {

  const [ventanas, setVentanas] = useState([])
  const [nuevaVentana, setNuevaVentana] = useState(estadoInicial)
  const [procesando, setProcesando] = useState(false)
  const { proyecto } = useSelector(state => state.proyecto)

  const agregarVentana = e => {
    e.preventDefault()
    setProcesando(true)
    const formData = new FormData()
    formData.append('ti', (nuevaVentana.inicio).toString().replace(',', '.'))
    formData.append('tf', (nuevaVentana.termino).toString().replace(',', '.'))
    formData.append('canal', nuevaVentana.canal)
    formData.append('tir', (nuevaVentana.inicioRef).toString().replace(',', '.'))
    formData.append('tfr', (nuevaVentana.terminoRef).toString().replace(',', '.'))
    formData.append('canalr', nuevaVentana.canalRef)
    formData.append('imu', new Blob([imu], { type: 'text/plain' }))
    formData.append('emg', new Blob([emg], { type: 'text/plain' }))
    axios.post(proyecto === 'EPT' ? 'https://compsci.cl/ept-proc' : 'https://compsci.cl/kine-proc', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(({ data }) => {
        const {
          codo_forzado, codo_mantenido, duracion_sel,
          hombro_forzado, hombro_mantenido, maxV_sel,
          mean_cvm, mean_sel, muneca_forzado,
          muneca_mantenido, porcentaje_tiempo, rms_cvm,
          rms_sel,tiempo_sobre30
        } = data
        setProcesando(false)
        setVentanas([
          ...ventanas,
          {
            ...nuevaVentana,
            codo_forzado, codo_mantenido, duracion_sel,
            hombro_forzado, hombro_mantenido, maxV_sel,
            mean_cvm, mean_sel, muneca_forzado,
            muneca_mantenido, porcentaje_tiempo, rms_cvm,
            rms_sel,tiempo_sobre30
          }
        ])
        setNuevaVentana(estadoInicial)
      })
      .catch(err => {
        setProcesando(false)
        console.log(err)
      })
  }

  return (
    <div className="ModalAnalisis" onClick={esconder}>
      <div className="ModalAnalisis__contenedor" onClick={e => e.stopPropagation()}>
        <button className="ModalAnalisis__cerrar" onClick={esconder}>
          <InlineIcon icon={close} />
        </button>
        <form
          className="ModalAnalisis__formulario"
          onSubmit={agregarVentana}
        >
          <h2>Análisis</h2>
          <label>
            Etiqueta:
            <input
              disabled={procesando}
              type="text"
              name="etiqueta"
              value={nuevaVentana.etiqueta}
              onChange={e => setNuevaVentana({...nuevaVentana, etiqueta: e.target.value})}
              style={{ width: '7rem' }}
            />
          </label>
          <h3>Medición</h3>
          <label>
            Inicio:
            <input
              type="number"
              name="inicio"
              disabled={procesando}
              value={nuevaVentana.inicio}
              onChange={e => setNuevaVentana({...nuevaVentana, inicio: e.target.value})}
            /> segundos
          </label>
          <label>
            Fin:
            <input
              type="number"
              name="termino"
              disabled={procesando}
              value={nuevaVentana.termino}
              onChange={e => setNuevaVentana({...nuevaVentana, termino: e.target.value})}
            /> segundos
          </label>
          <label>
            Canal EMG:
            <select
              name="canal"
              disabled={procesando}
              value={nuevaVentana.canal}
              onChange={e => setNuevaVentana({...nuevaVentana, canal: e.target.value})}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>
          <h3>Referencia (contr. máx.)</h3>
          <label>
            Inicio:
            <input
              type="number"
              name="inicio"
              disabled={procesando}
              value={nuevaVentana.inicioRef}
              onChange={e => setNuevaVentana({...nuevaVentana, inicioRef: e.target.value})}
            /> segundos
          </label>
          <label>
            Fin:
            <input
              type="number"
              name="termino"
              disabled={procesando}
              value={nuevaVentana.terminoRef}
              onChange={e => setNuevaVentana({...nuevaVentana, terminoRef: e.target.value})}
            /> segundos
          </label>
          <label>
            Canal EMG:
            <select
              name="canal"
              disabled={procesando}
              value={nuevaVentana.canalRef}
              onChange={e => setNuevaVentana({...nuevaVentana, canalRef: e.target.value})}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>
          {!procesando
            ? <button type="submit">
                Analizar
              </button>
            : <p className="ModalAnalisis__procesando">Procesando los datos... (esto podría demorar)</p>
          }
        </form>
        <div className="ModalAnalisis__contenedor_resultados">
          <h2>Resultados</h2>
          {proyecto === 'EPT'
            ? <TablaEPT ventanas={ventanas} setVentanas={setVentanas} />
            : <TablaKine ventanas={ventanas} setVentanas={setVentanas} />
          }
        </div>
      </div>
    </div>
  )
}

export default ModalAnalisis
