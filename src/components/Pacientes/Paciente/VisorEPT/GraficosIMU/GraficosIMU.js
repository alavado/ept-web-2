import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficosIMU.css'

const GraficosIMU = ({ datos }) => {

  console.log(datos)

  return (
    <div className="GraficosIMU">
      <h1>IMU</h1>
      <h2>Hombro</h2>
      <Line
        data={{
          labels: datos.map(d => d.ts),
          datasets: [
            { data: datos.map(d => d.hombro[0]) },
            { data: datos.map(d => d.hombro[1]) },
            { data: datos.map(d => d.hombro[2]) },
          ]
        }}
      />
      <h2>Codo</h2>
      <Line
        data={{
          labels: datos.map(d => d.ts),
          datasets: [
            { data: datos.map(d => d.codo[0]) },
            { data: datos.map(d => d.codo[1]) },
            { data: datos.map(d => d.codo[2]) },
          ]
        }}
      />
      <h2>Muñeca</h2>
      <Line
        data={{
          labels: datos.map(d => d.ts),
          datasets: [
            { data: datos.map(d => d.muñeca[0]) },
            { data: datos.map(d => d.muñeca[1]) },
            { data: datos.map(d => d.muñeca[2]) },
          ]
        }}
      />
    </div>
  )
}

export default GraficosIMU
