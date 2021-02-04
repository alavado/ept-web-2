import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { guardaPrueba } from '../../redux/ducks/ept'
import './NuevoRegistro.css'

const pruebas = [
  ["Hombro","Funcionales","Apley"],
  ["Hombro","Funcionales","Localización de cara"],
  ["Hombro","Funcionales","Localización ipsilateral"],
  ["Hombro","Funcionales","Localización contralateral"],
  ["Hombro","ROM","Flexión "],
  ["Hombro","ROM","Extensión"],
  ["Hombro","ROM","Abducción"],
  ["Hombro","ROM","Aducción "],
  ["Hombro","ROM","Rot. Interna"],
  ["Hombro","ROM","Rot. externa-0"],
  ["Hombro","ROM","Rot. externa-45"],
  ["Hombro","ROM","Rot. externa-90"],
  ["Codo","Funcionales","Localización de cara"],
  ["Codo","Funcionales","Localización ipsilateral"],
  ["Codo","Funcionales","Localización contralateral"],
  ["Codo","Funcionales","Flexion activa"],
  ["Codo","Funcionales","Extension activa"],
  ["Codo","ROM","Flexion"],
  ["Codo","ROM","Extension"],
  ["Codo","ROM","Pronación"],
  ["Codo","ROM","Supinación"],
  ["Muñeca","Funcionales","Phalen palmar"],
  ["Muñeca","Funcionales","Phalen dorsal"],
  ["Muñeca","Funcionales","Flexion activa"],
  ["Muñeca","Funcionales","Extensión activa"],
  ["Muñeca","ROM","Flexion"],
  ["Muñeca","ROM","Extension"],
  ["Muñeca","ROM","Pronación"],
  ["Muñeca","ROM","Supinación"],
  ["Muñeca","ROM","Radialización"],
  ["Muñeca","ROM","Ulnarización"]
]

const NuevoRegistro = () => {

  const { id } = useParams()
  const history = useHistory()

  const segmentos = [...new Set(pruebas.map(p => p[0]))]
  const [segmento, setSegmento] = useState(segmentos[0])
  const [tipo, setTipo] = useState(pruebas[0][1])
  const [prueba, setPrueba] = useState(pruebas[0][2])
  const dispatch = useDispatch()

  const { proyecto } = useSelector(state => state.proyecto)

  if (proyecto === 'EPT') {
    history.push(`/pacientes/${id}/agregar_registro/ept`)
  }

  return (
    <div className="NuevoRegistro">
      <h1 className="NuevoRegistro__titulo">Seleccione la prueba</h1>
      <div className="NuevoRegistro__contenedor_opciones">
        <label>
          Segmento
          <select onChange={e => setSegmento(e.target.value)}>
            {segmentos.map(s => (
              <option key={`option-segmento-${s}`} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Tipo de prueba
          <select onChange={e => setTipo(e.target.value)}>
            {[...new Set(pruebas.filter(p => p[0] === segmento).map(p => p[1]))].map(s => (
              <option key={`option-tipo-${s}`} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Prueba
          <select onChange={e => setPrueba(e.target.value)}>
            {[...new Set(pruebas.filter(p => p[0] === segmento && p[1] === tipo).map(p => p[2]))].map(s => (
              <option key={`option-prueba-${s}`} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <button
          className="NuevoRegistro__opcion"
          onClick={() => {
            dispatch(guardaPrueba([segmento, tipo, prueba]))
            history.push(`/pacientes/${id}/agregar_registro/ept`)
          }}
        >
          Comenzar
        </button>
      </div>
    </div>
  )
}

export default NuevoRegistro
