import React from 'react'
import './RegistroObservacion.css'

const RegistroObservacion = () => {

  const agregarObservacion = e => {
    e.preventDefault()
  }

  return (
    <div className="RegistroObservacion">
      <h1>Agregar observación</h1>
      <form
        className="RegistroObservacion__formulario"
        onSubmit={agregarObservacion}
      >
        <textarea placeholder="Ingrese observación">
        </textarea>
        <button type="submit">Agregar</button>
      </form>
    </div>
  )
}

export default RegistroObservacion
