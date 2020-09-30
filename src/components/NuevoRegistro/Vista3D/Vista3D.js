import React from 'react'
import GLB from '../../GLB'
import classNames from 'classnames'
import Draggable from 'react-draggable'
import Icon from '@iconify/react'
import cursorMove from '@iconify/icons-mdi/cursor-move'
import { useSelector } from 'react-redux'
import './Vista3D.css'

const Vista3D = () => {
  
  const { mostrar3D } = useSelector(state => state.ept)

  return (
    <Draggable handle=".Vista3D_titulo">
      <div className={classNames({
        Vista3D: true,
        'Vista3D--activo': mostrar3D
      })}>
        <div className="Vista3D_titulo">
          <h1>Vista 3D</h1>
          <Icon icon={cursorMove} />
        </div>
        <GLB />
      </div>
    </Draggable>
  )
}

export default Vista3D
