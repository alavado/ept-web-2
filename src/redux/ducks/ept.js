const mostrar3D = 'ept/mostrar3D'

const defaultState = {
  mostrar3D: false
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case mostrar3D: {
      return {
        ...state,
        mostrar3D: !state.mostrar3D
      }
    }
    default: return state
  }
}

export const toggleMostrar3D = () => ({
  type: mostrar3D
})
