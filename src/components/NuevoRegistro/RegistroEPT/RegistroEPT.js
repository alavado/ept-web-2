import React from 'react'
import './RegistroEPT.css'
import BotonesEPT from './BotonesEPT'
import Camara from '../../Camara'
import Vista3D from '../Vista3D'

const RegistroEPT = () => {
  
  return (
    <div className="RegistroEPT">
      <Camara>
        <BotonesEPT />
        <Vista3D />
      </Camara>
    </div>
  )
}

export default RegistroEPT
