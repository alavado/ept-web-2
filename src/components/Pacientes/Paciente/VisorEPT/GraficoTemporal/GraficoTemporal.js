import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficoTemporal.css'

const GraficoTemporal = ({ datos }) => {

  if (!datos) {
    return null
  }

  console.log(datos)

  const series = datos.reduce((prev, { v }) => (
    [[...prev[0], v[0]], [...prev[1], v[1]], [...prev[2], v[2]]]
  ), [[], [], []])
  const tiempos = datos.map(d => d.t)
  const labels = ['eje x', 'eje y', 'eje z']
  const colores = ['red', 'green', 'blue']

  return (
    <div className="GraficoTemporal">
      {series.map((serie, i) => (
        <div
          className="GraficoTemporal__contenedor_grafico"
          key={`contenedor-grafico-${i}`}
        >
          <Line
            data={{
              labels: tiempos,
              datasets: [{
                data: serie,
                label: labels[i],
                borderColor: colores[i]
              }]
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                xAxes: [{
                  ticks: {
                    callback: item => 'a'
                  }
                }]
              }
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default GraficoTemporal
