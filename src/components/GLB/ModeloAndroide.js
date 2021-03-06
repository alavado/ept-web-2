import React, { useState, useRef, useMemo } from 'react'
import { useLoader, useFrame, useThree, extend } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Matrix4 } from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { useQuaternion } from '../../hooks/useQuaternion'

extend({ OrbitControls })

export default function ModeloAndroide({ cuaternionTorso, cuaternionBrazo, cuaternionAntebrazo, cuaternionMano }) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/modelos/androide.glb')
  const [torso, setTorso] = useState(undefined)
  const [brazo, setBrazo] = useState(undefined)
  const [antebrazo, setAntebrazo] = useState(undefined)
  const [mano, setMano] = useState(undefined)
  const { nodes, materials } = gltf
  const { gl, camera } = useThree()
  const ref = useRef()

  const skeleton = useMemo(() => {
    if (!gltf.skeleton) {
      gltf.skeleton = gltf.nodes.Figura.skeleton
    }
    setTorso(gltf.nodes.Figura.skeleton.bones[0])
    setBrazo(gltf.nodes.Figura.skeleton.bones[6])
    setAntebrazo(gltf.nodes.Figura.skeleton.bones[7])
    setMano(gltf.nodes.Figura.skeleton.bones[8])
    return gltf.skeleton
  }, [gltf])

  const qTorso = useQuaternion(cuaternionTorso, false, true)
  const qBrazo = useQuaternion(cuaternionBrazo)
  const qAntebrazo = useQuaternion(cuaternionAntebrazo)
  const qMano = useQuaternion(cuaternionMano)

  useFrame(() => {
    const m8 = new Matrix4()
    m8.makeRotationFromQuaternion(qTorso.interpolado)
    torso.quaternion.setFromRotationMatrix(m8)
    const m5 = new Matrix4()
    m5.makeRotationFromQuaternion(qBrazo.interpolado)
    // m5.makeRotationFromQuaternion(corregirCuaternion(cuaternionBrazo, [1, 0, 0, 1]))
    brazo.quaternion.setFromRotationMatrix(m5)
    const m6 = new Matrix4()
    m6.makeRotationFromQuaternion(qAntebrazo.interpolado)
    antebrazo.quaternion.setFromRotationMatrix(m6)
    const m7 = new Matrix4()
    m7.makeRotationFromQuaternion(qMano.interpolado)
    mano.quaternion.setFromRotationMatrix(m7)
  })

  return (
    <perspectiveCamera position={[0, -1, -1]}>
      <group ref={group} dispose={null}>
        <orbitControls ref={ref} args={[camera, gl.domElement]} />
        <primitive object={nodes.Figura} />
        <primitive object={torso} />
        <skinnedMesh
          material={materials.Material}
          geometry={nodes.Figura.geometry}
          skeleton={skeleton}
        />
      </group>
    </perspectiveCamera>
  )
}
