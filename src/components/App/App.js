import React, { useState } from 'react'
import { w3cwebsocket } from 'websocket'
import './App.css'

const App = () => {

  const [mensaje, setMensaje] = useState('')

  const conectar = ip => {
    const socket = new w3cwebsocket(`ws://${ip}`, 'message')
    console.log('conectando...')
    socket.onerror = () => {
    }
    socket.onopen = () => {
    }
    socket.onclose = () => {
    }
    socket.onmessage = e => {
      console.log(e)
      if (typeof e.data === 'string') {
        setMensaje(e.data)
      }
    }
  }

  return (
    <div className="App">
      EPT
      <button onClick={e => conectar('compsci.cl:2304/input')}>Conectar</button>
      <p>{mensaje}</p>
    </div>
  )
}

export default App
