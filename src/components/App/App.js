import React, { useEffect } from 'react'
import './App.css'
import Header from '../Header'
import { useDispatch, useSelector } from 'react-redux'
import { fijarCero } from '../../redux/ducks/sensores'

const App = () => {
  
  const { imus, emgs } = useSelector(state => state.sensores)
  const dispatch = useDispatch()

  useEffect(() => {
    const actualizarSensores = () => dispatch({ type: 'sensores/actualizar_async' })
    const interval = setInterval(actualizarSensores, 22)
    return () => clearInterval(interval)
  }, [dispatch])

  if (!imus || !emgs) {
    return null
  }

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        {imus.map(imu => (
          <div style={{ margin: '1.5em' }} key={imu.mac}>
            <div>{imu.segmento}</div>
            <div>{imu.mac}</div>
            <div>{imu.angulosRelativos.map((angulo, i) => (
              <div key={`${imu.mac}-angulo-${i}`}>{angulo.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}°</div>
            ))}</div>
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
      <div style={{ backgroundColor: '#cecece', width: '180px', height: '180px' }}>
        {imus.length > 1 && <div style={{ transform: `translateY(calc(-.5em + ${90 + imus[0].angulosRelativos[1]}px)) translateX(calc(-.5em + ${90 - imus[0].angulosRelativos[0]}px))`}}>o</div>}
      </div>
    </div>
  )
}

export default App
