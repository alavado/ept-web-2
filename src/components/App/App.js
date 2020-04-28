import React, { useState, useEffect } from 'react'
import { w3cwebsocket } from 'websocket'
import './App.css'
import { Line, Doughnut } from 'react-chartjs-2'

const App = () => {

  const [mensaje, setMensaje] = useState('')
  const [datos, setDatos] = useState({
    e: {
      t: [],
      v: []
    }
  })
  const [activacion, setActivacion] = useState(0)

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
      if (typeof e.data === 'string') {
        setMensaje(e.data)
        const obj = JSON.parse(e.data)
        setDatos(prev => {
          if (prev.e.v.length > 1) {
            const maximo = prev.e.v.slice(-25).reduce((y, x) => Math.max(y, x))
            const minimo = prev.e.v.slice(-25).reduce((y, x) => Math.min(y, x))
            setActivacion(() => maximo - minimo)
            console.log(maximo-minimo)
          }
          return {
            ...prev,
            e: {
              t: [...prev.e.t, ...obj.e.t],
              v: [...prev.e.v, ...obj.e.v]
            }
          }
        })
      }
    }
  }

  useEffect(() => {
    const avanzarSerie = setInterval(() => {
      setDatos(prev => {
        let { t, v } = prev.e
        while (t.length > 90) {
          t.shift()
          v.shift()
        }
        return {
          ...prev,
          e: {
            t,
            v
          }
        }
      })
    }, 22)
    return () => {
      clearInterval(avanzarSerie)
    }
  }, [])

  return (
    <div className="App">
      EPT
      <button onClick={e => conectar('compsci.cl:2304/input')}>Conectar</button>
      <div className="App__graficos">
        <div style={{flex:1}}>
        <Line
          data={{
            labels: datos.e.t.slice(0, 90).reverse(),
            datasets: [
              {
                label: 'emg',
                data: datos.e.v.slice(0, 90).reverse(),
                lineTension: 0,
                pointRadius: 0,
                fill: false
              }
            ],
          }}
          options={{
            maintainAspectRatio: false,
            animation: {
              duration: 0
            },
            scales: {
              yAxes: [{
                ticks: {
                  suggestedMin: 450,
                  suggestedMax: 700,
                  autoSkip: false,
                  stepSize: 50
                },
                gridLines: {
                  display: false,
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }]
            }
          }}
        />
        </div>
        <div style={{flex: 1}}>
        <Doughnut
          data={{
            labels: ['Activacion'],
            datasets: [{
              data: [250, activacion, Math.max(0, 250 - activacion)],
              backgroundColor: ['white', 'red', 'white']
            }]
          }}
          options={{
            maintainAspectRatio: false,
            cutoutPercentage: 50,
            rotation: 0,
            animation: {
              duration: 100
            }
          }}
        />
        </div>
      </div>
      {/* <p>{mensaje}</p> */}
    </div>
  )
}

export default App
