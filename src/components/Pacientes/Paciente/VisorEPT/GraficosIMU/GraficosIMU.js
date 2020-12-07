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
      <h1>IMU</h1>
      {propiedades.map(prop => (
        <div key={`contenedor-prop-${prop.nombre}`}>
          <h2>{prop.nombre}</h2>
          <div className="GraficosIMU__contenedor_grafico">
            <Line
              data={{
                labels: datos.map(d => d.ts),
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
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default GraficosIMU
