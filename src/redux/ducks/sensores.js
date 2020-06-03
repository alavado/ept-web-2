import { toEulerAngles, calcularRotacionRelativa } from '../../helpers/rotaciones'

const actualizar = 'sensores/actualizar'
const segmentos = ['brazo', 'antebrazo', 'mano']

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
          datosOriginales: rotaciones[mac],
          angulosAbsolutos: toEulerAngles(rotaciones[mac]),
          angulosRelativos: calcularRotacionRelativa(macs.slice(0, i + 1).map(m => rotaciones[m]))
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
