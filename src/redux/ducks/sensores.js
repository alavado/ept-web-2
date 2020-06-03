import Quaternion from 'quaternion'
import { toEulerAngles } from '../../helpers/euler'

const actualizar = 'sensores/actualizar'
const segmentos = ['brazo', 'antebrazo', 'codo']

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actualizar:
      const datosOriginales = action.payload
      let imus = []
      if (datosOriginales && datosOriginales.r) {
        const { r: rotaciones } = datosOriginales
        const macs = Object.keys(rotaciones)
        imus = macs.map((mac, i) => ({
          mac,
          segmento: segmentos[i],
          angulosAbsolutos: toEulerAngles(rotaciones[mac]),
          angulosRelativos: toEulerAngles(rotaciones[mac])
        }))
      }
      return {
        ...state,
        datosOriginales,
        imus
      }
    default: {
      return state
    }
  }
}

export function actualizarMediciones(msg) {
  return { type: actualizar, payload: msg }
}
