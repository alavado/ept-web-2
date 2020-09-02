import React, { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fijarCero } from '../../redux/ducks/sensores'
import { Canvas } from 'react-three-fiber'
import ModeloMMR from './ModeloMMR'
import './IMUs.css'

const IMUs = () => {

  const { imus } = useSelector(state => state.sensores)
  const dispatch = useDispatch()

  if (!imus || imus.length === 0) {
    return null
  }

  return (
    <div style={{ display: 'flex' }}>
      {imus.map((imu, i) => (
        <div
          style={{ margin: '1.5em' }}
          key={imu.mac}
        >
          <div>{imu.segmento}</div>
          <div>{imu.mac}</div>
          <div>{imu.angulosRelativos.map((angulo, i) => (
            <div
              key={`${imu.mac}-angulo-${i}`}
              style={{ textAlign: 'right' }}
            >
              {angulo.toLocaleString('de-DE', { maximumFractionDigits: 1, minimumFractionDigits: 1 })}°
            </div>
          ))}</div>
          <div
            key={`r3f-imu-${i}`}
            style={{ width: '180px', height: '180px' }}
          >
            <Canvas>
              <ambientLight intensity={.95} />
              <pointLight position={[2, 3, 0]} power={0.1}  />
              <Suspense fallback={null}>
                <ModeloMMR cuaternion={imu.cuaternionCorregido} n={i} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      ))}
      <button onClick={() => dispatch(fijarCero())}>Corregir</button>
    </div>
  )
}

export default IMUs
