import { useState, useEffect } from "react"
import { Quaternion } from "three"
import { crearCuaternion, crearCuaternionTorso } from "../helpers/rotaciones"

const msInterpolacion = 1000.0 / 60

export const useQuaternion = (cuaternion, torso = false) => {

  const [cuaterniones, setCuaterniones] = useState({
    anterior: new Quaternion(),
    siguiente: new Quaternion(),
    interpolado: new Quaternion(),
    ti: 0,
    tf: 0
  })

  useEffect(() => {
    if (cuaternion) {
      setCuaterniones(prev => ({
        ...prev,
        anterior: prev.siguiente,
        siguiente: torso ? crearCuaternionTorso(cuaternion) : crearCuaternion(cuaternion, true),
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
  }, [])

  return cuaterniones
}
