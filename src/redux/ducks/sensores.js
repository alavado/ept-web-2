import { toEulerAngles, calcularRotacionRelativa, corregirCuaternion } from '../../helpers/rotaciones'
import { Quaternion } from 'three'

const actualizar = 'sensores/actualizar'
const calibrar = 'sensores/calibrar'

const segmentos = ['hombro', 'codo', 'muñeca']

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actualizar:
      const datosOriginales = action.payload
      let imus = []
      if (datosOriginales && datosOriginales.r) {
        const { r: cuaterniones } = datosOriginales
        const macs = Object.keys(cuaterniones)
        imus = macs.map((mac, i) => ({
          mac,
          segmento: segmentos[i],
          cuaternion: cuaterniones[mac], // [w, x, y, z]
          angulosAbsolutos: toEulerAngles(corregirCuaternion(cuaterniones[mac], state.rotacionesCero[i])),
          angulosRelativos: calcularRotacionRelativa(macs.slice(0, i + 1).map((m, j) => corregirCuaternion(cuaterniones[m], state.rotacionesCero[j])))
        }))
      }
      let emgs = []
      if (datosOriginales && datosOriginales.e) {
        emgs = datosOriginales.e.v.reduce((prev, valor) => {
          const lecturas = valor.split(',').map(Number)
          return prev.map((emg, i) => ({ ...emg, valores: [...emg.valores, lecturas[i]] }))
        }, datosOriginales.e.v[0].split(',').map((v, i) => ({ id: `EMG ${i + 1}`, valores: [Number(v)] })))
      }
      return {
        ...state,
        datosOriginales,
        imus,
        emgs,
        rotacionesCero: (state.rotacionesCero && state.rotacionesCero.length === imus.length && state.rotacionesCero) || imus.map(() => Quaternion.ONE)
      }
    case calibrar: {
      return {
        ...state,
        rotacionesCero: state.imus.map(imu => imu.cuaternion)
      }
    }
    default: {
      return state
    }
  }
}

export function actualizarMediciones(msg) {
  return { type: actualizar, payload: msg }
}

export const fijarCero = () => {
  return { type: calibrar }
}
