import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficosEMG.css'

const GraficosEMG = ({ datos }) => {

  const propiedades = ['emg1', 'emg2', 'emg3', 'emg4']

  return (
    <div className="GraficosEMG">
      {propiedades.map(prop => (
        <div key={`grafico-emg-${prop}`}>
          <h1>EMG {prop}</h1>
          <div className="GraficosEMG__contenedor_grafico">
            <Line
              data={{
                labels: datos.filter((_, i) => i % 1000 === 0).map(d => d.ts),
                datasets: [{
                  data: datos.filter((_, i) => i % 1000 === 0).map(d => d[prop]),
                  label: 'mV',
                  pointRadius: 0,
                  borderColor: 'red'
                }]
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

export default GraficosEMG
