import React, { useState, useRef, useMemo } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Matrix4 } from 'three'
import { crearCuaternion } from '../../helpers/rotaciones'

export default function ModeloMMR(props) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/mmr.glb')
  const [hueso, setHueso] = useState(undefined)
  const { nodes, materials } = gltf

  const skeleton = useMemo(() => {
    if (!gltf.skeleton) {
      gltf.skeleton = gltf.nodes.Carcasa.skeleton
    }
    setHueso(gltf.nodes.Carcasa.skeleton.bones[0])
    return gltf.skeleton
  }, [gltf])

  useFrame(() => {
    const m4 = new Matrix4()
    m4.makeRotationFromQuaternion(crearCuaternion(props.cuaternion))
    hueso.quaternion.setFromRotationMatrix(m4)
  })

  return (
    <group ref={group} {...props} dispose={null}>
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
  )
}
