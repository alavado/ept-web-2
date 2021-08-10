import { InlineIcon } from '@iconify/react'
import iconoBorrar from '@iconify/icons-mdi/delete-alert'
import iconoDescargar from '@iconify/icons-mdi/download-box'
import './TablaKine.css'

const TablaKine = ({ ventanas, setVentanas }) => {

  const descargarReporte = () => console.log('x')

  return (
    <table className="TablaKine">
      <thead>
        <tr>
          <th>Etiqueta</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Muñeca: flexoextensión</th>
          <th>Muñeca: pronosupinación</th>
          <th>Codo: flexoextensión</th>
          <th>Codo: pronosupinación</th>
          <th>Codo: ulnarización/radialización</th>
          <th>Hombro: abducción/aducción</th>
          <th>Hombro: flexoextensión</th>
          <th>Hombro: rotación</th>
          <th>Amplitud Promedio (mV)</th>
          <th>Duración Movimiento (seg)</th>
          <th>Máx. Poder Espectral (V2/Hz)</th>
          <th>Frec. Máx. Poder Espectral (V2/Hz)</th>
          <th>Promedio Poder Espectral (V2/Hz)</th>
          <th>RMS</th>
          <th>RMS Normalizado (%)</th>
          <th>Promedio Normalizado (%)</th>
          <th>Mediana Poder Espectral (V2/Hz)</th>
          <th>Frecuencia Media (Hz)</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {ventanas.map((v, i) => {
          const {
            etiqueta,
            inicio,
            termino,
            codo_flexExt,
            codo_pronoSup,
            codo_ulnaRad,
            duracion_sel,
            f_max,
            hombro_abdAdd,
            hombro_flexExt,
            hombro_rotacion,
            max_power,
            mean_cvm,
            mean_power,
            mean_sel,
            median_freq,
            median_power,
            muneca_flexExt,
            muneca_pronoSup,
            rms_cvm,
            rms_sel,
          } = v
          return (
            <tr key={`fila-ventana-${i}`}>
              <td>{etiqueta}</td>
              <td>{inicio}</td>
              <td>{termino}</td>
              <td>{muneca_flexExt[0][0].toFixed(1)}° - {muneca_flexExt[0][1].toFixed(1)}°</td>
              <td>{muneca_pronoSup[0][0].toFixed(1)}° - {muneca_pronoSup[0][1].toFixed(1)}°</td>
              <td>{codo_flexExt[0][0].toFixed(1)}° - {codo_flexExt[0][1].toFixed(1)}°</td>
              <td>{codo_pronoSup[0][0].toFixed(1)}° - {codo_pronoSup[0][1].toFixed(1)}°</td>
              <td>{codo_ulnaRad[0][0].toFixed(1)}° - {codo_ulnaRad[0][1].toFixed(1)}°</td>
              <td>{hombro_abdAdd[0][0].toFixed(1)}° - {hombro_abdAdd[0][1].toFixed(1)}°</td>
              <td>{hombro_flexExt[0][0].toFixed(1)}° - {hombro_flexExt[0][1].toFixed(1)}°</td>
              <td>{hombro_rotacion[0][0].toFixed(1)}° - {hombro_rotacion[0][1].toFixed(1)}°</td>
              <td>{mean_sel.toPrecision(1)}</td>
              <td>{duracion_sel}</td>
              <td>{max_power.toPrecision(3)}</td>
              <td>{f_max.toFixed(1)}</td>
              <td>{mean_power.toPrecision(1)}</td>
              <td>{rms_sel.toPrecision(1)}</td>
              <td>{rms_cvm.toFixed(1)}</td>
              <td>{mean_cvm.toFixed(1)}</td>
              <td>{median_power.toPrecision(1)}</td>
              <td>{median_freq.toFixed(1)}</td>
              <td>
                <div className="TablaKine__botones">
                  <button onClick={() => descargarReporte(v)}>
                    <InlineIcon icon={iconoDescargar} /> Descargar reporte
                  </button>
                  <button onClick={() => setVentanas(ventanas.filter((_, j) => i !== j))}>
                    <InlineIcon icon={iconoBorrar} /> Borrar medición
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TablaKine