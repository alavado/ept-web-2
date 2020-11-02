import { decode } from 'jsonwebtoken'

const guardarToken = 'jwt/guardarToken'
const limpiarToken = 'jwt/limpiarToken'
const guardarUsuario = 'jwt/guardarUsuario'

const defaultState = {
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGZhZDA2OWJmY2NmNTJhNGU0ZmQxYSIsImlhdCI6MTYwNDI2NDQyMywiZXhwIjoxNjA2ODU2NDIzfQ.NQupMPcN-MZimsP4kDt_n673IlutEJMXDAWiEdunY08',
  id: decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGZhZDA2OWJmY2NmNTJhNGU0ZmQxYSIsImlhdCI6MTYwNDI2NDQyMywiZXhwIjoxNjA2ODU2NDIzfQ.NQupMPcN-MZimsP4kDt_n673IlutEJMXDAWiEdunY08').id
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case guardarToken: {
      return {
        ...state,
        jwt: action.payload,
        id: decode(action.payload).id
      }
    }
    case limpiarToken: {
      return {
        ...state,
        jwt: undefined
      }
    }
    case guardarUsuario: {
      return {
        ...state,
        usuario: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const tomaEsteToken = jwt => {
  return { type: guardarToken, payload: jwt }
}

export const cierraLaSesion = () => {
  return { type: limpiarToken }
}

export const guardaUsuario = usuario => {
  return { type: guardarUsuario, payload: usuario }
}