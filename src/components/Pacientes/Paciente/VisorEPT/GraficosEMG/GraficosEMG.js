import React, { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import classNames from 'classnames'
import './GraficosEMG.css'

const propiedades = ['emg1', 'emg2', 'emg3', 'emg4']
const f = 100

const GraficosEMG = ({ datos, tiempoVideo }) => {

  const [oculto, setOculto] = useState(propiedades.slice().fill(false))

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

  const labels = useMemo(() => menosDatos.map(d => d.ts - menosDatos[0].ts), [menosDatos])
  const graficos = useMemo(() => (
    propiedades.map((prop, i) => (
      <div
        className={classNames({
          "GraficoEMG__tarjeta_grafico": true,
          "GraficoEMG__tarjeta_grafico--oculto": oculto[i]
        })}
        key={`grafico-emg-${prop}`}
      >
        <div className="GraficosEMG__superior">
          <h2 className="GraficosEMG__titulo">EMG: {prop}</h2>
          <button
            onClick={() => setOculto([...oculto.slice(0, i), !oculto[i], ...oculto.slice(i + 1)])}
            className="GraficosEMG__boton_ocultar"
          >
            {oculto[i] ? 'Mostrar' : 'Ocultar'} gráfico
          </button>
        </div>
        <div className="GraficosEMG__contenedor_grafico">
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  data: menosDatos.map(d => d[prop]),
                  label: 'mV',
                  pointRadius: 0,
                  borderColor: 'red',
                  borderWidth: 1
                },
                {
                  data: labels.map((l, i) => l < tiempoVideo * 1000 && labels[i + 1] > tiempoVideo * 1000 ? 500 : 0),
                  type: 'bar',
                  label: 'tiempo',
                  backgroundColor: 'black'
                }
              ]
            }}
            options={{
              maintainAspectRatio: false,
              animation: false,
              legend: {
                position: 'top',
                labels: {
                  filter: label => label.text !== 'tiempo'
                }
              },
              scales: {
                xAxes: [{
                  ticks: {
                    maxRotation: 0,
                    callback: v => {
                      const totalSegundos = Math.round(v)
                      if (totalSegundos % 10) {
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
  ), [menosDatos, oculto, setOculto, tiempoVideo, labels])

  return (
    <div className="GraficosEMG">
      {graficos}
    </div>
  )
}

export default GraficosEMG
