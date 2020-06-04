import { toEulerAngles, calcularRotacionRelativa } from '../../helpers/rotaciones'

const actualizar = 'sensores/actualizar'
const segmentos = ['hombro', 'codo', 'muñeca']

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
        emgs
      }
    default: {
      return state
    }
  }
}

export function actualizarMediciones(msg) {
  return { type: actualizar, payload: msg }
}
