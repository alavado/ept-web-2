import React, { useState, useRef, useMemo } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Matrix4 } from 'three'
import { crearCuaternion } from '../../helpers/rotaciones'

export default function Model(props) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/box.glb')
  const [hueso, setHueso] = useState(undefined)
  const { nodes, materials } = gltf

  const skeleton = useMemo(() => {
    if (!gltf.skeleton) {
      gltf.skeleton = gltf.nodes.Box.skeleton
    }
    setHueso(gltf.nodes.Box.skeleton.bones[0])
    return gltf.skeleton
  }, [gltf])

  useFrame(() => {
    const m4 = new Matrix4()
    m4.makeRotationFromQuaternion(crearCuaternion(props.cuaternion))
    hueso.quaternion.setFromRotationMatrix(m4)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Box} />
      <primitive object={hueso} />
      <skinnedMesh
        material={materials.Material}
        geometry={nodes.Box.geometry}
        skeleton={skeleton}
      />
    </group>
  )
}
