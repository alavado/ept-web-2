import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficosEMG.css'

const GraficosEMG = ({ datos }) => {

  console.log(datos)

  return (
    <div className="GraficosEMG">
      <h1>EMG</h1>
      <Line
        data={{
          labels: datos.filter((_, i) => i % 1000 === 0).map(d => d.ts),
          datasets: [{
            data: datos.filter((_, i) => i % 1000 === 0).map(d => d.emg1),
          }]
        }}
      />
      <Line
        data={{
          labels: datos.filter((_, i) => i % 1000 === 0).map(d => d.ts),
          datasets: [{
            data: datos.filter((_, i) => i % 1000 === 0).map(d => d.emg2),
          }]
        }}
      />
      <Line
        data={{
          labels: datos.filter((_, i) => i % 1000 === 0).map(d => d.ts),
          datasets: [{
            data: datos.filter((_, i) => i % 1000 === 0).map(d => d.emg3),
          }]
        }}
      />
      <Line
        data={{
          labels: datos.filter((_, i) => i % 1000 === 0).map(d => d.ts),
          datasets: [{
            data: datos.filter((_, i) => i % 1000 === 0).map(d => d.emg4),
          }]
        }}
      />
    </div>
  )
}

export default GraficosEMG
