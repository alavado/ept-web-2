import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleMostrar3D } from '../../../../redux/ducks/ept'
import './BotonesEPT.css'

const BotonesEPT = () => {

  const dispatch = useDispatch()

  return (
    <div className="BotonesEPT">
      <button
        className="BotonesEPT__boton"
        onClick={() => dispatch(toggleMostrar3D())}
      >
        3D
      </button>
    </div>
  )
}

export default BotonesEPT
