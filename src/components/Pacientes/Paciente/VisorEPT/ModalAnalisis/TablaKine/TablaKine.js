import './TablaKine.css'

const TablaKine = ({ ventanas, setVentanas }) => {
  return (
    <table className="TablaKine">
      <thead>
        <tr>
          <th>Etiqueta</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Duración</th>
          <th>hombro_forzado</th>
          <th>hombro_mantenido</th>
          <th>codo_forzado</th>
          <th>codo_mantenido</th>
          <th>muneca_forzado</th>
          <th>muneca_mantenido</th>
          <th>duracion_sel</th>
          <th>maxV_sel</th>
          <th>mean_cvm</th>
          <th>mean_sel</th>
          <th>porcentaje_tiempo</th>
          <th>rms_cvm</th>
          <th>rms_sel</th>
          <th>tiempo_sobre30</th>
          <th>opciones</th>
        </tr>
      </thead>
      <tbody>
        {ventanas.map((v, i) => {
          const {
            codo_forzado, codo_mantenido, duracion_sel,
            hombro_forzado, hombro_mantenido, maxV_sel,
            mean_cvm, mean_sel, muneca_forzado,
            muneca_mantenido, porcentaje_tiempo, rms_cvm,
            rms_sel,tiempo_sobre30
          } = v
          return (
            <tr key={`fila-ventana-${i}`}>
              <td>{v.etiqueta}</td>
              <td>{(+v.inicio).toFixed(1)}</td>
              <td>{(+v.termino).toFixed(1)}</td>
              <td>{(v.termino - v.inicio).toFixed(1)}</td>
              <td>{(+hombro_forzado).toFixed(1)}</td>
              <td>{(+hombro_mantenido).toFixed(1)}</td>
              <td>{(+codo_forzado).toFixed(1)}</td>
              <td>{(+codo_mantenido).toFixed(1)}</td>
              <td>{(+muneca_forzado).toFixed(1)}</td>
              <td>{(+muneca_mantenido).toFixed(1)}</td>
              <td>{(+duracion_sel).toFixed(1)}</td>
              <td>{(+maxV_sel).toFixed(1)}</td>
              <td>{(+mean_cvm).toFixed(1)}</td>
              <td>{(+mean_sel).toFixed(1)}</td>
              <td>{(+porcentaje_tiempo).toFixed(1)}</td>
              <td>{(+rms_cvm).toFixed(1)}</td>
              <td>{(+rms_sel).toFixed(1)}</td>
              <td>{(+tiempo_sobre30).toFixed(1)}</td>
              <td><button onClick={() => setVentanas(ventanas.filter((_, j) => i !== j))}>Borrar</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TablaKine