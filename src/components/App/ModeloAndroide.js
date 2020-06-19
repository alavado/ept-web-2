import React, { useState, useRef, useMemo } from 'react'
import { useLoader, useFrame, useThree, extend } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Matrix4 } from 'three'
import { crearCuaternion } from '../../helpers/rotaciones'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

extend({ OrbitControls })

export default function ModeloAndroide({ cuaternionBrazo, cuaternionAntebrazo, cuaternionMano }) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, 'modelos/androide.glb')
  const [raiz, setRaiz] = useState(undefined)
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
    setRaiz(gltf.nodes.Figura.skeleton.bones[0])
    setBrazo(gltf.nodes.Figura.skeleton.bones[4])
    setAntebrazo(gltf.nodes.Figura.skeleton.bones[5])
    setMano(gltf.nodes.Figura.skeleton.bones[6])
    return gltf.skeleton
  }, [gltf])

  useFrame(() => {
    const m5 = new Matrix4()
    m5.makeRotationFromQuaternion(crearCuaternion(cuaternionBrazo))
    brazo.quaternion.setFromRotationMatrix(m5)
    const m6 = new Matrix4()
    m6.makeRotationFromQuaternion(crearCuaternion(cuaternionAntebrazo))
    antebrazo.quaternion.setFromRotationMatrix(m6)
    const m7 = new Matrix4()
    m7.makeRotationFromQuaternion(crearCuaternion(cuaternionMano))
    mano.quaternion.setFromRotationMatrix(m7)
  })

  return (
    <group ref={group} dispose={null}>
      <orbitControls ref={ref} args={[camera, gl.domElement]} />
        <primitive object={nodes.Figura} />
        <primitive object={raiz} />
        <skinnedMesh
          material={materials.Material}
          geometry={nodes.Figura.geometry}
          skeleton={skeleton}
        />
    </group>
  )
}