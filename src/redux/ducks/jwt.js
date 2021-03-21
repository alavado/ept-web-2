import { decode } from 'jsonwebtoken'

const guardarToken = 'jwt/guardarToken'
const limpiarToken = 'jwt/limpiarToken'
const guardarUsuario = 'jwt/guardarUsuario'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGZhZDA2OWJmY2NmNTJhNGU0ZmQxYSIsImlhdCI6MTYxNjI4Nzc4OCwiZXhwIjoxNjE4ODc5Nzg4fQ.wuIL9i5XXMnv1CK03-domBywIF58DxKsXuPNZycey1Y'

const defaultState = {
  jwt: token,
  id: decode(token).id
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