import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficosEMG.css'

const GraficosEMG = ({ datos }) => {

  const propiedades = ['emg1', 'emg2', 'emg3', 'emg4']
  const menosDatos = datos.filter((_, i) => i % 100 === 0)

  return (
    <div className="GraficosEMG">
      {propiedades.map(prop => (
        <div className="GraficoEMG__tarjeta_grafico" key={`grafico-emg-${prop}`}>
          <h2 className="GraficosEMG__titulo">EMG: {prop}</h2>
          <div className="GraficosEMG__contenedor_grafico">
            <Line
              data={{
                labels: menosDatos.map(d => d.ts - menosDatos[0].ts),
                datasets: [{
                  data: datos.map(d => d[prop]),
                  label: 'mV',
                  pointRadius: 0,
                  borderColor: 'red'
                }]
              }}
              options={{
                maintainAspectRatio: false,
                legend: {
                  position: 'right'
                },
                scales: {
                  xAxes: [{
                    ticks: {
                      maxRotation: 0,
                      callback: v => {
                        const totalSegundos = Math.round(v)
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

export default GraficosEMG
