import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import './GraficosEMG.css'

const propiedades = ['emg1', 'emg2', 'emg3', 'emg4']
const f = 100

const GraficosEMG = ({ datos }) => {

  const menosDatos = useMemo(() => (
    datos
      .filter((_, i) => i % f === 0)
      .map((d, i) => datos
        .slice(i * f, (i + 1) * f)
        .reduce((obj, x) => ({
          ...obj,
          emg1: x.emg1 + obj.emg1,
          emg2: x.emg2 + obj.emg2,
          emg3: x.emg3 + obj.emg3,
          emg4: x.emg4 + obj.emg4
        })))
        .map(d => ({
          ...d,
          emg1: d.emg1 / f,
          emg2: d.emg2 / f,
          emg3: d.emg3 / f,
          emg4: d.emg4 / f
        }))
  ), [datos])
  
  const graficos = useMemo(() => (
    propiedades.map(prop => (
      <div className="GraficoEMG__tarjeta_grafico" key={`grafico-emg-${prop}`}>
        <h2 className="GraficosEMG__titulo">EMG: {prop}</h2>
        <div className="GraficosEMG__contenedor_grafico">
          <Line
            data={{
              labels: menosDatos.map(d => d.ts - menosDatos[0].ts),
              datasets: [{
                data: menosDatos.map(d => d[prop]),
                label: 'mV',
                pointRadius: 0,
                borderColor: 'red',
                borderWidth: 1
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
    ))
  ), [menosDatos])

  return (
    <div className="GraficosEMG">
      {graficos}
    </div>
  )
}

export default GraficosEMG
