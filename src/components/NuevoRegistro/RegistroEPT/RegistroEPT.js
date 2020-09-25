import React from 'react'
import GLB from '../../GLB'
import IMUs from '../../IMUs'
import './RegistroEPT.css'

const RegistroEPT = () => {
  return (
    <div className="RegistroEPT">
      3D
      <div className="RegistroEPT__3d">
        <GLB />
        {/* <IMUs /> */}
      </div>
    </div>
  )
}

export default RegistroEPT
