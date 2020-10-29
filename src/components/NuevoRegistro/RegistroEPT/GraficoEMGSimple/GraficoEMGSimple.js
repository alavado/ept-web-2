import React from 'react'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import './GraficoEMGSimple.css'
import Icon from '@iconify/react'
import cursorMove from '@iconify/icons-mdi/cursor-move'
import Draggable from 'react-draggable'

const GraficoEMGSimple = () => {

  const { historial } = useSelector(state => state.sensores)

  if (!historial) {
    return null
  }

  return (
    <Draggable handle=".GraficoEMGSimple_titulo">
      <div className="GraficoEMGSimple">
        <div className="GraficoEMGSimple_titulo">
          <h1>EMG</h1>
          <Icon icon={cursorMove} />
        </div>
        {historial.emgs.map((emg, i) => (
          <React.Fragment key={`grafico-emg-${emg.id}`}>
            <h2 className="GraficoEMGSimple_subtitulo">
              Canal {i + 1}
            </h2>
            <div className="GraficoEMGSimple__contenedor_grafico">
              <Line
                data={{
                  labels: Object.keys(emg.valores),
                  datasets: [{
                    data: emg.valores,
                    label: emg.id,
                    pointRadius: 0
                  }]
                }}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    display: false
                  },
                  animation: false,
                  scales: {
                    yAxes: [{
                      ticks: {
                        min: 500,
                        max: 1000
                      }
                    }],
                    xAxes: [{
                      display: false
                    }]
                  }
                }}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </Draggable>
  )
}

export default GraficoEMGSimple
