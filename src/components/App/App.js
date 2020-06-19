import React, { Suspense, useEffect } from 'react'
import './App.css'
import Header from '../Header'
import { useDispatch, useSelector } from 'react-redux'
import { fijarCero } from '../../redux/ducks/sensores'
import { Canvas } from 'react-three-fiber'
import ModeloMMR from './ModeloMMR'

const App = () => {
  
  const { imus, emgs } = useSelector(state => state.sensores)
  const dispatch = useDispatch()

  useEffect(() => {
    const actualizarSensores = () => dispatch({ type: 'sensores/actualizar_async' })
    const interval = setInterval(actualizarSensores, 22)
    return () => clearInterval(interval)
  }, [dispatch])

  if (!imus || !emgs || imus.length === 0) {
    return null
  }

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        {imus.map((imu, i) => (
          <div style={{ margin: '1.5em' }} key={imu.mac}>
            <div>{imu.segmento}</div>
            <div>{imu.mac}</div>
            <div>{imu.angulosRelativos.map((angulo, i) => (
              <div key={`${imu.mac}-angulo-${i}`}>{angulo.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}°</div>
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
      </div>
      <button onClick={() => dispatch(fijarCero())}>Corregir</button>
      <div style={{ display: 'flex' }}>
        {emgs.map(emg => (
          <div style={{ margin: '1.5em' }} key={emg.id}>
            <div>{emg.id}</div>
            <div>{emg.valores[0]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
