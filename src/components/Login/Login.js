import React, { useState } from 'react'
import loginMutation from '../../graphql/mutations/login'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import { tomaEsteToken } from '../../redux/ducks/jwt'
import './Login.css'
import Conexion from '../Conexion'

const Login = () => {

  const [variables, setVariables] = useState({
    identifier: '',
    password: ''
  })
  const [redirigir, setRedirigir] = useState(false)
  const [error, setError] = useState(undefined)
  const [mutate] = useMutation(loginMutation)
  const dispatch = useDispatch()

  const login = e => {
    e.preventDefault()
    mutate({ variables })
      .then(({ data }) => {
        const token = data.login.jwt
        dispatch(tomaEsteToken(token))
        setRedirigir(true)
      })
      .catch(err => {
        console.error(err)
        setError('Usuario o contraseña incorrectos.')
      })
  }

  if (redirigir) {
    return <Conexion />
  }

  return (
    <div className="Login">
      <form onSubmit={login} className="Login_form">
        <input
          type="email"
          onChange={e => setVariables({ ...variables, identifier: e.target.value })}
        />
        <input
          type="password"
          onChange={e => setVariables({ ...variables, password: e.target.value })}
        />
        <button type="submit">Ingresar</button>
        {error}
      </form>
    </div>
  )
}

export default Login
