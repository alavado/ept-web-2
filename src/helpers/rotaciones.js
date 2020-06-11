import Quaternion from 'quaternion'

export const toEulerAngles = q => {
  const [w, x, y, z] = q
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
    const cuaternionSegmentoSuperior = new Quaternion(cuaterniones.slice(-2)[0]).normalize()
    const cuaternionSegmento = new Quaternion(cuaterniones.slice(-1)[0]).normalize()
    return toEulerAngles(cuaternionSegmentoSuperior.conjugate().mul(cuaternionSegmento).toVector())
  }
}

export const corregirCuaternion = (cuaternion, correccion) => {
  const cuaternionOriginal = new Quaternion(cuaternion).normalize()
  const cuaternionCorreccion = new Quaternion(correccion).normalize()
  return cuaternionCorreccion.conjugate().mul(cuaternionOriginal).toVector()
}