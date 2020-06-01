const actualizar = 'sensores/actualizar'

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actualizar:
      return {
        ...state,
        sensores: action.payload
      }
    default: {
      return state
    }
  }
}

export function actualizarMediciones(msg) {
  return { type: actualizar, payload: msg }
}
