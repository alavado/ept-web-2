import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Matrix4, Quaternion } from 'three'
import { crearCuaternion } from '../../helpers/rotaciones'

export default function ModeloMMR({ n, cuaternion }) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, `modelos/mmr${n}.glb`)
  const [hueso, setHueso] = useState(undefined)
  const [cuaterniones, setCuaterniones] = useState({
    anterior: new Quaternion(),
    siguiente: new Quaternion(),
    interpolado: new Quaternion(),
    ti: 0,
    tf: 0
  })
  const { nodes, materials } = gltf
  const msInterpolacion = 1000.0 / 60

  const skeleton = useMemo(() => {
    if (!gltf.skeleton) {
      gltf.skeleton = gltf.nodes.Carcasa.skeleton
    }
    setHueso(gltf.nodes.Carcasa.skeleton.bones[0])
    return gltf.skeleton
  }, [gltf])

  useEffect(() => {
    if (cuaternion) {
      setCuaterniones(prev => ({
        ...prev,
        anterior: prev.siguiente,
        siguiente: crearCuaternion(cuaternion, true),
        ti: prev.tf,
        tf: Date.now()
      }))
    }
  }, [cuaternion])

  useEffect(() => {
    const intervalInterpolacion = setInterval(() => {
      setCuaterniones(prev => ({
        ...prev,
        interpolado: prev.anterior.slerp(prev.siguiente, (Date.now() - prev.tf) / (prev.tf - prev.ti))
      }))
    }, msInterpolacion)
    return () => clearInterval(intervalInterpolacion)
  }, [msInterpolacion])

  useFrame(() => {
    const m4 = new Matrix4()
    m4.makeRotationFromQuaternion(cuaterniones.interpolado)
    hueso.quaternion.setFromRotationMatrix(m4)
  })

  return (
    <perspectiveCamera position={[0, 0, 3]}>
      <group ref={group} dispose={null}>
        {/* <orbitControls args={[camera, domElement]} /> */}
        <primitive object={nodes.Carcasa} />
        <primitive object={hueso} />
        <skinnedMesh
          material={materials.MaterialCarcasa}
          geometry={nodes.Carcasa.geometry}
          skeleton={skeleton}
        />
        <skinnedMesh
          material={materials.MaterialInterior}
          geometry={nodes.Boton.geometry}
          skeleton={skeleton}
        />
        <skinnedMesh
          material={materials.MaterialInterior}
          geometry={nodes.Hoyito.geometry}
          skeleton={skeleton}
        />
      </group>
    </perspectiveCamera>
  )
}
