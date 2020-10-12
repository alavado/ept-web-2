import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import './TarjetaHistorial.css'
import { InlineIcon } from '@iconify/react'
import videoCheck from '@iconify/icons-mdi/video-check'

const TarjetaHistorial = ({ registro }) => {

  const { id, createdAt } = registro

  return (
    <div className="TarjetaHistorial">
      <div className="TarjetaHistorial__icono">
        <InlineIcon icon={videoCheck} />
      </div>
      <div className="TarjetaHistorial__contenedor_derecha">
        <div className="TarjetaHistorial__actividad">
          EPT
        </div>
        <div className="TarjetaHistorial__fecha">
          {moment(createdAt).fromNow()}
        </div>
      </div>
    </div>
  )
}

export default TarjetaHistorial
