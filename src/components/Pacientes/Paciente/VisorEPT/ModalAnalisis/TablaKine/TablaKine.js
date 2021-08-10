import './TablaKine.css'

const TablaKine = ({ ventanas, setVentanas }) => {
  return (
    <table className="TablaKine">
      <thead>
        <tr>
          <th>Etiqueta</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>duracion_sel</th>
          <th>muneca_flexExt</th>
          <th>muneca_pronoSup</th>
          <th>codo_flexExt</th>
          <th>codo_pronoSup</th>
          <th>codo_ulnaRad</th>
          <th>hombro_abdAdd</th>
          <th>hombro_flexExt</th>
          <th>hombro_rotacion</th>
          <th>f_max</th>
          <th>max_power</th>
          <th>mean_cvm</th>
          <th>mean_power</th>
          <th>mean_sel</th>
          <th>median_freq</th>
          <th>median_power</th>
          <th>rms_cvm</th>
          <th>rms_sel</th>
          <th>opciones</th>
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
              <td>{duracion_sel}</td>
              <td>{muneca_flexExt[0][0].toFixed(1)}° - {muneca_flexExt[0][1].toFixed(1)}°</td>
              <td>{muneca_pronoSup[0][0].toFixed(1)}° - {muneca_pronoSup[0][1].toFixed(1)}°</td>
              <td>{codo_flexExt[0][0].toFixed(1)}° - {codo_flexExt[0][1].toFixed(1)}°</td>
              <td>{codo_pronoSup[0][0].toFixed(1)}° - {codo_pronoSup[0][1].toFixed(1)}°</td>
              <td>{codo_ulnaRad[0][0].toFixed(1)}° - {codo_ulnaRad[0][1].toFixed(1)}°</td>
              <td>{hombro_abdAdd[0][0].toFixed(1)}° - {hombro_abdAdd[0][1].toFixed(1)}°</td>
              <td>{hombro_flexExt[0][0].toFixed(1)}° - {hombro_flexExt[0][1].toFixed(1)}°</td>
              <td>{hombro_rotacion[0][0].toFixed(1)}° - {hombro_rotacion[0][1].toFixed(1)}°</td>
              <td>{f_max.toFixed(1)}</td>
              <td>{max_power.toFixed(1)}</td>
              <td>{mean_cvm.toFixed(1)}</td>
              <td>{mean_power.toFixed(1)}</td>
              <td>{mean_sel.toFixed(1)}</td>
              <td>{median_freq.toFixed(1)}</td>
              <td>{median_power.toFixed(1)}</td>
              <td>{rms_cvm.toFixed(1)}</td>
              <td>{rms_sel.toFixed(1)}</td>
              <td><button onClick={() => setVentanas(ventanas.filter((_, j) => i !== j))}>Borrar</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TablaKine