const ACTUALIZAR = 'sensores/actualizar'

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ACTUALIZAR:
      return {
        ...state,
        sensores: action.payload
      }
    default:
      return state
  }
}

export function actualizarMediciones() {
  return { type: ACTUALIZAR }
}
