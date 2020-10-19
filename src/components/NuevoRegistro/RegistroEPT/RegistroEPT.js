import React from 'react'
import './RegistroEPT.css'
import BotonesEPT from './BotonesEPT'
import Camara from '../../Camara'
import Vista3D from '../Vista3D'
import GraficoEMGSimple from './GraficoEMGSimple'

const RegistroEPT = () => {
  
  return (
    <div className="RegistroEPT">
      <Camara>
        <BotonesEPT />
        <Vista3D />
        <GraficoEMGSimple />
      </Camara>
    </div>
  )
}

export default RegistroEPT
