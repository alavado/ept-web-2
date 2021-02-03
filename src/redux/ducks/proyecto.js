const seleccionarProyecto = 'proyecto/seleccionarProyecto'

const defaultState = {
  proyecto: 'EPT'
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case seleccionarProyecto: {
      return {
        ...state,
        proyecto: action.payload
      }
    }
    default: return state
  }
}

export const seleccionaProyecto = proyecto => ({
  type: seleccionarProyecto,
  payload: proyecto
})
