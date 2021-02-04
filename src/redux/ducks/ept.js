const mostrar3D = 'ept/mostrar3D'
const fijarPrueba = 'ept/fijarPrueba'

const defaultState = {
  mostrar3D: true,
  prueba: null
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case mostrar3D: {
      return {
        ...state,
        mostrar3D: !state.mostrar3D
      }
    }
    case fijarPrueba: {
      return {
        ...state,
        prueba: action.payload
      }
    }
    default: return state
  }
}

export const toggleMostrar3D = () => ({
  type: mostrar3D
})

export const guardaPrueba = prueba => ({
  type: fijarPrueba,
  payload: prueba
})