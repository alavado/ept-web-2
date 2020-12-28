import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficosIMU.css'

const propiedades = [
  {
    nombre: 'hombro',
  },
  {
    nombre: 'codo',
  },
  {
    nombre: 'muñeca'
  }
]

const ejes = [
  {
    nombre: 'x',
    color: 'red'
  },
  {
    nombre: 'y',
    color: 'green'
  },
  {
    nombre: 'z',
    color: 'blue'
  }
]

const GraficosIMU = ({ datos }) => {

  return (
    <div className="GraficosIMU">
      {propiedades.map(prop => (
        <div className="GraficosIMU__tarjeta_grafico" key={`contenedor-prop-${prop.nombre}`}>
          <h2 className="GraficosIMU__titulo">IMU: {prop.nombre}</h2>
          <div className="GraficosIMU__contenedor_grafico">
            <Line
              data={{
                labels: datos.map(d => d.ts - datos[0].ts),
                datasets: ejes.map((eje, i) => (
                  {
                    data: datos.map(d => d[prop.nombre][i]),
                    label: eje.nombre,
                    pointRadius: 0,
                    borderColor: eje.color
                  }
                ))
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  xAxes: [{
                    ticks: {
                      maxRotation: 0,
                      callback: v => {
                        const totalSegundos = Math.round(v / 1000)
                        if (totalSegundos % 10 !== 0) {
                          return ''
                        }
                        const minutos = Math.floor(totalSegundos / 60)
                        const segundos = totalSegundos - minutos * 60
                        return `0${minutos}:${segundos < 10 ? '0' : ''}${segundos}`
                      }
                    }
                  }]
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default GraficosIMU
