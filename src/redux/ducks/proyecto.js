const seleccionarProyecto = 'proyecto/seleccionarProyecto'
const seleccionarPaciente = 'proyecto/seleccionarPaciente'

const defaultState = {
  proyecto: 'Kine',
  paciente: {}
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case seleccionarProyecto: {
      return {
        ...state,
        proyecto: action.payload
      }
    }
    case seleccionarPaciente: {
      return {
        ...state,
        paciente: action.payload
      }
    }
    default: return state
  }
}

export const seleccionaProyecto = proyecto => ({
  type: seleccionarProyecto,
  payload: proyecto
})


export const seleccionaPaciente = paciente => ({
  type: seleccionarPaciente,
  payload: paciente
})