import { euler, calcularCuaternionRelativo, corregirCuaternion, formatearCuaternionMMR } from '../../helpers/rotaciones'
import { Quaternion } from 'three'

const actualizar = 'sensores/actualizar'
const calibrar = 'sensores/calibrar'
const grabar = 'sensores/grabar'
const deternerGrabacion = 'sensores/deternerGrabacion'

const articulaciones = ['tronco', 'hombro', 'codo', 'muñeca']

const defaultState = {
  grabando: false,
  grabacion: [],
  historial: {
    emgs: [],
    imus: []
  }
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case actualizar:
      const datosOriginales = action.payload
      let imus = []
      if (datosOriginales && datosOriginales.r) {
        const { r: cuaterniones } = datosOriginales
        const macs = Object.keys(cuaterniones)
        imus = macs.map((mac, i) => {
          const cuaternion = formatearCuaternionMMR(cuaterniones[mac])
          const cuaternionesCorregidos = macs.slice(0, i + 1).map((m, j) => {
            let cuaternion = formatearCuaternionMMR(cuaterniones[m])
            return corregirCuaternion(cuaternion, state.rotacionesCero[j], i === 0)
          })
          const cuaternionRelativo = calcularCuaternionRelativo(cuaternionesCorregidos)
          return {
            mac,
            segmento: articulaciones[i],
            cuaternion,
            cuaternionCorregido: cuaternionesCorregidos.slice(-1)[0],
            cuaternionRelativo,
            angulosAbsolutos: euler(cuaternionesCorregidos.slice(-1)[0]),
            angulosRelativos: euler(cuaternionRelativo)
          }
        })
      }
      let emgs = []
      if (datosOriginales && datosOriginales.e) {
        emgs = datosOriginales.e.v.slice(1).reduce((prev, valor) => {
          const lecturas = valor.split(',').map(Number)
          return prev.map((emg, i) => ({ ...emg, valores: [...emg.valores, lecturas[i]] }))
        }, datosOriginales.e.v[0].split(',').map((v, i) => ({ id: `EMG ${i + 1}`, valores: [Number(v)] })))
      }
      const historial = {
        ...state.historial,
        emgs: emgs.map(({ id, valores }) => ({
          id,
          valores: [...(state.historial.emgs.find(e => e.id === id)?.valores ?? []), ...valores].slice(-100)
        }))
      }
      return {
        ...state,
        datosOriginales,
        imus,
        emgs,
        historial,
        rotacionesCero: (state.rotacionesCero && state.rotacionesCero.length === imus.length && state.rotacionesCero) || imus.map(() => Quaternion.ONE),
        grabacion: state.grabando ? [
          ...state.grabacion,
          {
            t: Date.now(),
            datos: imus.map(({ segmento, angulosRelativos }) => ({
              segmento,
              angulos: [...angulosRelativos.map(a => Math.round(a * 100) / 100.0)]
            }))
          }
        ] : state.grabacion
      }
    case calibrar: {
      return {
        ...state,
        rotacionesCero: state.imus.map(imu => imu.cuaternion)
      }
    }
    case grabar: {
      return {
        ...state,
        grabacion: [],
        grabando: true
      }
    }
    case deternerGrabacion: {
      return {
        ...state,
        grabando: false
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

export const graba = () => ({
  type: grabar
})

export const dejaDeGrabar = () => ({
  type: deternerGrabacion
})