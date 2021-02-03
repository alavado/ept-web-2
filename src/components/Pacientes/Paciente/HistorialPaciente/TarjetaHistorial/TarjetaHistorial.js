import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import './TarjetaHistorial.css'
import { InlineIcon } from '@iconify/react'
import videoCheck from '@iconify/icons-mdi/video-check'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TarjetaHistorial = ({ registro }) => {

  const { id, createdAt } = registro
  const history = useHistory()
  const { proyecto } = useSelector(state => state.proyecto)

  return (
    <div
      className="TarjetaHistorial"
      onClick={() => history.push(`/ept/${id}`)}
    >
      <div className="TarjetaHistorial__icono">
        <InlineIcon icon={videoCheck} />
      </div>
      <div className="TarjetaHistorial__contenedor_derecha">
        <div className="TarjetaHistorial__actividad">
          {proyecto === 'EPT' ? 'EPT' : 'Prueba kinesiología'}
        </div>
        <div className="TarjetaHistorial__fecha">
          {moment(createdAt).fromNow()}
        </div>
      </div>
    </div>
  )
}

export default TarjetaHistorial
