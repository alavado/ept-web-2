import { Quaternion } from 'three'

export const toEulerAngles = q => {
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

export const calcularRotacionRelativa = cuaterniones => {
  if (cuaterniones.length < 2) {
    return toEulerAngles(cuaterniones[0])
  }
  else {
    const cuaternionSegmentoSuperior = crearCuaternion(cuaterniones.slice(-2)[0])
    const cuaternionSegmento = crearCuaternion(cuaterniones.slice(-1)[0])
    return toEulerAngles(cuaternionSegmentoSuperior.conjugate().multiply(cuaternionSegmento).toArray())
  }
}

export const corregirCuaternion = (cuaternion, correccion) => {
  const cuaternionOriginal = crearCuaternion(cuaternion)
  const cuaternionCorreccion = correccion ? crearCuaternion(correccion) : new Quaternion()
  return cuaternionCorreccion.conjugate().multiply(cuaternionOriginal).toArray()
}

const crearCuaternion = cuaternionWXYZ => {
  const [w, x, y, z] = cuaternionWXYZ
  return new Quaternion(x, y, z, w).normalize()
}