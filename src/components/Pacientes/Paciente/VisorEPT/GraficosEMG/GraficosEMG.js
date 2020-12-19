import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficosEMG.css'

const GraficosEMG = ({ datos }) => {

  const propiedades = ['emg1', 'emg2', 'emg3', 'emg4']
  const menosDatos = datos.filter((_, i) => i % 10 === 0)

  return (
    <div className="GraficosEMG">
      {propiedades.map(prop => (
        <div key={`grafico-emg-${prop}`}>
          <h1>EMG {prop}</h1>
          <div className="GraficosEMG__contenedor_grafico">
            <Line
              data={{
                labels: menosDatos.map(d => Math.round(d.ts - menosDatos[0].ts)),
                datasets: [{
                  data: datos.map(d => d[prop]),
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
