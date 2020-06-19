import React, { useRef, useMemo } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Quaternion, Matrix4 } from 'three'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, '/box.glb')

  const skeleton = useMemo(() => {
    const m4 = new Matrix4()
    m4.makeRotationFromQuaternion(props.cuaternion)
    nodes.Box.skeleton.bones[0].quaternion.setFromRotationMatrix(new Matrix4())
    return nodes.Box.skeleton
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Box} />
      <skinnedMesh
        material={materials.Material}
        geometry={nodes.Box.geometry}
        skeleton={skeleton}
      />
    </group>
  )
}
