import { Quaternion } from 'three'

// esta función la saqué de la versión en C++ de
// https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
export const euler = q => {
  const [x, y, z, w] = q
  let angles = {
    roll: 0,
    pitch: 0,
    yaw: 0
  }
  // roll (x-axis rotation)
  let sinr_cosp = 2 * (w * x + y * z)
  let cosr_cosp = 1 - 2 * (x * x + y * y)
  angles.roll = Math.atan2(sinr_cosp, cosr_cosp)
  // pitch (y-axis rotation)
  let sinp = 2 * (w * y - z * x)
  if (Math.abs(sinp) >= 1) {
    angles.pitch = Math.sign(Math.PI / 2, sinp) // use 90 degrees if out of range
  }
  else {
    angles.pitch = Math.asin(sinp)
  }
  // yaw (z-axis rotation)
  let siny_cosp = 2 * (w * z + x * y)
  let cosy_cosp = 1 - 2 * (y * y + z * z)
  angles.yaw = Math.atan2(siny_cosp, cosy_cosp)

  return [angles.roll, angles.pitch, angles.yaw].map(x => x * 180 / Math.PI)
}

export const calcularCuaternionRelativo = cuaterniones => {
  if (cuaterniones.length < 2) {
    return cuaterniones[0]
  }
  const cuaternionSegmentoSuperior = crearCuaternion(cuaterniones.slice(-2)[0])
  const cuaternionSegmento = crearCuaternion(cuaterniones.slice(-1)[0])
  return cuaternionSegmentoSuperior.conjugate().multiply(cuaternionSegmento).normalize().toArray()
}

export const corregirCuaternion = (cuaternion, correccion, torso = false) => {
  const cuaternionOriginal = crearCuaternion(cuaternion)
  const cuaternionCorreccion = correccion ? crearCuaternion(correccion) : new Quaternion()
  // if (!torso) {
  //   const correccion = new Quaternion(1, 0, 0, 1).normalize()
  //   return correccion.multiply(cuaternionCorreccion.conjugate().multiply(cuaternionOriginal)).toArray()
  // }
  return cuaternionCorreccion.conjugate().multiply(cuaternionOriginal).toArray()
}

export const crearCuaternion = (cuaternion, absoluto) => {
  const [x, y, z, w] = cuaternion
  if (absoluto) {
    return new Quaternion(y, x, z, w).normalize()
  }
  return new Quaternion(x, y, z, w).normalize()
}

export const formatearCuaternionMMR = cuaternion => {
  const [w, x, y, z] = cuaternion
  return [-y, x, z, w]
}

export const crearCuaternionTorso = cuaternion => {
  const q = crearCuaternion(cuaternion)
  const correccion = new Quaternion(1, 0, 0, 1).normalize()
  return correccion.multiply(q)
}