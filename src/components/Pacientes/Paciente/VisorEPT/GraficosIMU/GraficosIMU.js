import React, { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import classNames from 'classnames'
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

const f = 100

const GraficosIMU = ({ datos }) => {

  const [oculto, setOculto] = useState(propiedades.slice().fill(false))
  const menosDatos = useMemo(() => (
    datos
      .filter((_, i) => i % f === 0)
      .map((d, i) => datos
        .slice(i * f, (i + 1) * f)
        .reduce((obj, x) => ({
          ...obj,
          hombro: [
            x.hombro[0] + obj.hombro[0],
            x.hombro[1] + obj.hombro[1],
            x.hombro[2] + obj.hombro[2]
          ],
          codo: [
            x.codo[0] + obj.codo[0],
            x.codo[1] + obj.codo[1],
            x.codo[2] + obj.codo[2]
          ],
          muñeca: [
            x.muñeca[0] + obj.muñeca[0],
            x.muñeca[1] + obj.muñeca[1],
            x.muñeca[2] + obj.muñeca[2]
          ],
        })))
        .map(d => ({
          ...d,
          hombro: [d.hombro[0] / f, d.hombro[1] / f, d.hombro[2] / f],
          codo: [d.codo[0] / f, d.codo[1] / f, d.codo[2] / f],
          muñeca: [d.muñeca[0] / f, d.muñeca[1] / f, d.muñeca[2] / f],
        }))
  ), [datos])
  const labels = useMemo(() => menosDatos.map(d => d.ts - menosDatos[0].ts), [menosDatos])
  const graficos = useMemo(() => (
    propiedades.map((prop, i) => (
        <div 
          key={`contenedor-prop-${prop.nombre}`}
          className={classNames({
            "GraficoEMG__tarjeta_grafico": true,
            "GraficoEMG__tarjeta_grafico--oculto": oculto[i]
          })}
        >
        <div className="GraficosEMG__superior">
          <h2 className="GraficosEMG__titulo">IMU: {prop.nombre}</h2>
          <button
            onClick={() => setOculto([...oculto.slice(0, i), !oculto[i], ...oculto.slice(i + 1)])}
            className="GraficosEMG__boton_ocultar"
          >
            {oculto[i] ? 'Mostrar' : 'Ocultar'} gráfico
          </button>
        </div>
        <div className="GraficosIMU__contenedor_grafico">
          <Line
            data={{
              labels,
              datasets: ejes.map((eje, i) => (
                {
                  data: menosDatos.map(d => d[prop.nombre][i]),
                  label: eje.nombre,
                  pointRadius: 0,
                  borderColor: eje.color,
                  borderWidth: 1
                }
              ))
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
                      const totalSegundos = Math.round(v / 1000)
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
  ), [menosDatos, labels, oculto, setOculto])

  return (
    <div className="GraficosIMU">
      {graficos}
    </div>
  )
}

export default GraficosIMU
