import React, { useMemo, useRef, useState, useCallback, Suspense, useEffect } from 'react'
import './App.css'
import Header from '../Header'
import { useDispatch, useSelector } from 'react-redux'
import { fijarCero } from '../../redux/ducks/sensores'
import Box from './Box'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const PruebaR3F = () => {

  const [isHovered, setIsHovered] = useState(false)
  const [cuboActivo, setCuboActivo] = useState(-1)
  const color = isHovered ? 0xe5d54d : 0xf95b3c;
  const meshes = useRef([])

  const onHover = useCallback((e, value) => {
    e.stopPropagation()
    setIsHovered(value)
  }, [setIsHovered])

  const { camera, gl: { domElement } } = useThree()

  const nodesCubes = useMemo(() => Array.from(new Array(10)).map((el, i) => {
    const r = .1
    return (
      <mesh
        key={i}
        position={[r * i, r * i, r * i]}
        onPointerOver={e => onHover(e, true)}
        onPointerOut={e => onHover(e, false)}
        onClick={() => setCuboActivo(i)}
        ref={el => meshes.current[i] = el}
      >
        <boxBufferGeometry attach="geometry" args={[r, r, r]} />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
    )
  }), [color, setCuboActivo, onHover])

  useFrame(() => {
    cuboActivo >= 0 && (meshes.current[cuboActivo].rotation.y += 0.1)
  })

  return (
    <group>
      {/* {nodesCubes} */}
      <orbitControls args={[camera, domElement]} />
    </group>
  )
}

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

  console.log(imus)

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
      <div style={{ width: '480px', height: '480px', backgroundColor: 'gray' }}>
        <Canvas>
          <ambientLight />
          <PruebaR3F />
          <Suspense fallback={null}>
            <Box cuaternion={imus[0].cuaternion} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default App
