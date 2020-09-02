import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Canvas } from 'react-three-fiber'
import ModeloAndroide from './ModeloAndroide'

const GLB = () => {
  
  const { imus } = useSelector(state => state.sensores)
  const dispatch = useDispatch()

  useEffect(() => {
    const actualizarSensores = () => dispatch({ type: 'sensores/actualizar_async' })
    const interval = setInterval(actualizarSensores, 22)
    return () => clearInterval(interval)
  }, [dispatch])

  if (!imus || imus.length === 0) {
    return null
  }

  return (
    <div style={{ width: '380px', height: '380px', backgroundColor: 'white' }}>
      <Canvas>
        <ambientLight intensity={.95} />
        <directionalLight position={[10, 0, 0]} power={.5}  />
        <Suspense fallback={null}>
          <ModeloAndroide
            cuaternionTorso={imus[0].cuaternionCorregido}
            cuaternionBrazo={imus[1].cuaternionCorregido}
            cuaternionAntebrazo={imus[2].cuaternionRelativo}
            cuaternionMano={imus[3].cuaternionRelativo}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default GLB
