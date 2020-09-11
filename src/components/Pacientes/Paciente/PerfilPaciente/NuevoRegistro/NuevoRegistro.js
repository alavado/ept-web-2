import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './NuevoRegistro.css'

const NuevoRegistro = () => {

  const { id } = useParams()
  const history = useHistory()

  const opciones = [
    {
      nombre: 'Evaluación kinesiológica',
      href: '/'
    },
    {
      nombre: 'EPT',
      href: '/'
    },
    {
      nombre: 'Observación',
      href: `/pacientes/${id}/agregar_registro/observacion`
    },
  ]

  return (
    <div className="NuevoRegistro">
      <h1 className="NuevoRegistro__titulo">Seleccione el tipo de registro</h1>
      <div className="NuevoRegistro__contenedor_opciones">
        {opciones.map((opcion, i) => (
          <button
            key={`tipo-registro-${i}`}
            className="NuevoRegistro__opcion"
            onClick={() => history.push(opcion.href)}
          >
            {opcion.nombre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NuevoRegistro
