import React, { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import classNames from 'classnames'
import './GraficosEMG.css'

const propiedades = ['emg1', 'emg2', 'emg3', 'emg4']
const f = 100

const GraficosEMG = ({ datos }) => {

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
                position: 'top'
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
  ), [menosDatos, oculto, setOculto])

  return (
    <div className="GraficosEMG">
      {graficos}
    </div>
  )
}

export default GraficosEMG
