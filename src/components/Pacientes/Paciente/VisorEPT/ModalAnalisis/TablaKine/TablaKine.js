import { InlineIcon } from '@iconify/react'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import iconoBorrar from '@iconify/icons-mdi/cancel-box'
import iconoDescargar from '@iconify/icons-mdi/download-box'
import './TablaKine.css'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import query from '../../../../../../graphql/queries/ept'
import logoACHS from '../../../../../../assets/Logo_ACHS.png'
import moment from 'moment'
import { useSelector } from 'react-redux'

const TablaKine = ({ ventanas, setVentanas }) => {

  const { paciente } = useSelector(state => state.proyecto)

  console.log(paciente)

  const descargarReporte = async v => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    
    const pngBytes = await fetch(logoACHS).then((res) => res.arrayBuffer())
    const pngLogo = await pdfDoc.embedPng(pngBytes)
    const pngDims = pngLogo.scale(0.1)
    page.drawImage(pngLogo, {
      x: 25,
      y: 755,
      width: pngDims.width,
      height: pngDims.height
    })

    let size = 22
    let font = helveticaBold
    page.drawText(`Informe Análisis Plataforma`, { x: 165, y: 735, size, font })
    page.drawText(`"Mediciones ACHS"`, { x: 210, y: 705, size, font })

    let x1 = 50, x2 = 180, x3 = 320, x4 = 470
    let x = 50
    let y = 660
    size = 11
    font = helvetica
    page.drawText(`Nombre paciente:`, { x, y, size, font })
    page.drawText(`Edad:`, { x, y: y - 15, size, font })
    page.drawText(`Diagnóstico:`, { x, y: y - 30, size, font })
    page.drawText(`Fecha medición:`, { x, y: y - 60, size, font })

    page.drawText(`${paciente.nombres} ${paciente.apellido_paterno}`, { x: x2, y, size, font })
    page.drawText(`${moment().diff(paciente.edad, 'years')} años`, { x: x2, y: y - 15, size, font })
    page.drawText(`${paciente.diagnostico}`, { x: x2, y: y - 30, size, font })
    page.drawText(moment().format('dddd DD/MM/yyyy'), { x: x2, y: y - 60, size, font })

    page.drawText(`IMU`, { x, y: y - 95, size, font })

    page.drawLine({
      start: { x: x1 - 5, y: y - 105 },
      end: { x: 560, y: y - 105 }
    })
    font = helveticaBold
    size = 10
    page.drawText(`Segmento`, { x: x1, y: y - 120, size, font })
    page.drawText(`Plano movimiento`, { x: x2, y: y - 120, size, font })
    page.drawText(`Parámetro`, { x: x3, y: y - 120, size, font })
    page.drawText(`Valor`, { x: x4, y: y - 120, size, font })

    font = helvetica
    page.drawLine({
      start: { x: x1 - 5, y: y - 130 },
      end: { x: 560, y: y - 130 }
    })

    y = y - 145
    page.drawText(`Hombro`, { x: x1, y, size, font })
    page.drawText(`Flexo-extensión`, { x: x2, y, size, font })
    page.drawText(`Rango (°)`, { x: x3, y, size, font })
    page.drawText(`${v.muneca_flexExt[0][0].toFixed(1)}° - ${v.muneca_flexExt[0][1].toFixed(1)}°`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Promedio (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.muneca_flexExt[1].toFixed(1)}`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Máxima (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.muneca_flexExt[2].toFixed(1)}`, { x: x4, y, size, font })

    page.drawLine({
      start: { x: x2, y: y - 10 },
      end: { x: 560, y: y - 10}
    })
    
    y -= 25
    page.drawText(`Abducción-aducción`, { x: x2, y, size, font })
    page.drawText(`Rango (°)`, { x: x3, y, size, font })
    page.drawText(`${v.hombro_abdAdd[0][0].toFixed(1)}° - ${v.hombro_abdAdd[0][1].toFixed(1)}°`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Promedio (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.hombro_abdAdd[1].toFixed(1)}`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Máxima (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.hombro_abdAdd[2].toFixed(1)}`, { x: x4, y, size, font })

    page.drawLine({
      start: { x: x2, y: y - 10 },
      end: { x: 560, y: y - 10}
    })
    
    y -= 25
    page.drawText(`Rotación externa-interna`, { x: x2, y, size, font })
    page.drawText(`Rango (°)`, { x: x3, y, size, font })
    page.drawText(`${v.hombro_rotacion[0][0].toFixed(1)}° - ${v.hombro_rotacion[0][1].toFixed(1)}°`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Promedio (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.hombro_rotacion[1].toFixed(1)}`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Máxima (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.hombro_rotacion[2].toFixed(1)}`, { x: x4, y, size, font })

    page.drawLine({
      start: { x: x1, y: y - 10 },
      end: { x: 560, y: y - 10}
    })

    y -= 25
    page.drawText(`Codo`, { x: x1, y, size, font })
    page.drawText(`Flexo-extensión`, { x: x2, y, size, font })
    page.drawText(`Rango (°)`, { x: x3, y, size, font })
    page.drawText(`${v.codo_flexExt[0][0].toFixed(1)}° - ${v.codo_flexExt[0][1].toFixed(1)}°`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Promedio (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.codo_flexExt[1].toFixed(1)}`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Máxima (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.codo_flexExt[2].toFixed(1)}`, { x: x4, y, size, font })

    page.drawLine({
      start: { x: x2, y: y - 10 },
      end: { x: 560, y: y - 10}
    })
    
    y -= 25
    page.drawText(`Prono-supinación`, { x: x2, y, size, font })
    page.drawText(`Rango (°)`, { x: x3, y, size, font })
    page.drawText(`${v.codo_pronoSup[0][0].toFixed(1)}° - ${v.codo_pronoSup[0][1].toFixed(1)}°`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Promedio (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.codo_pronoSup[1].toFixed(1)}`, { x: x4, y, size, font })
    
    y -= 25
    page.drawText(`Velocidad Máxima (º/seg)`, { x: x3, y, size, font })
    page.drawText(`${v.codo_pronoSup[2].toFixed(1)}`, { x: x4, y, size, font })

    const page2 = pdfDoc.addPage()

    y = 750

    page2.drawLine({
      start: { x: x1, y },
      end: { x: 560, y}
    })

    y -= 15
    page2.drawText(`Muñeca`, { x: x1, y, size, font })
    page2.drawText(`Flexo-extensión`, { x: x2, y, size, font })
    page2.drawText(`Rango (°)`, { x: x3, y, size, font })
    page2.drawText(`${v.muneca_flexExt[0][0].toFixed(1)}° - ${v.muneca_flexExt[0][1].toFixed(1)}°`, { x: x4, y, size, font })
    
    y -= 25
    page2.drawText(`Velocidad Promedio (º/seg)`, { x: x3, y, size, font })
    page2.drawText(`${v.muneca_flexExt[1].toFixed(1)}`, { x: x4, y, size, font })
    
    y -= 25
    page2.drawText(`Velocidad Máxima (º/seg)`, { x: x3, y, size, font })
    page2.drawText(`${v.muneca_flexExt[2].toFixed(1)}`, { x: x4, y, size, font })

    page2.drawLine({
      start: { x: x2, y: y - 10 },
      end: { x: 560, y: y - 10}
    })
    
    y -= 25
    page2.drawText(`Prono-supinación`, { x: x2, y, size, font })
    page2.drawText(`Rango (°)`, { x: x3, y, size, font })
    page2.drawText(`${v.muneca_pronoSup[0][0].toFixed(1)}° - ${v.muneca_pronoSup[0][1].toFixed(1)}°`, { x: x4, y, size, font })
    
    y -= 25
    page2.drawText(`Velocidad Promedio (º/seg)`, { x: x3, y, size, font })
    page2.drawText(`${v.muneca_pronoSup[1].toFixed(1)}`, { x: x4, y, size, font })
    
    y -= 25
    page2.drawText(`Velocidad Máxima (º/seg)`, { x: x3, y, size, font })
    page2.drawText(`${v.muneca_pronoSup[2].toFixed(1)}`, { x: x4, y, size, font })

    page2.drawLine({
      start: { x: x2, y: y - 10 },
      end: { x: 560, y: y - 10}
    })
    
    y -= 25
    page2.drawText(`Radio-ulnarización`, { x: x2, y, size, font })
    page2.drawText(`Rango (°)`, { x: x3, y, size, font })
    page2.drawText(`${v.codo_ulnaRad[0][0].toFixed(1)}° - ${v.codo_ulnaRad[0][1].toFixed(1)}°`, { x: x4, y, size, font })
    
    y -= 25
    page2.drawText(`Velocidad Promedio (º/seg)`, { x: x3, y, size, font })
    page2.drawText(`${v.codo_ulnaRad[1].toFixed(1)}`, { x: x4, y, size, font })
    
    y -= 25
    page2.drawText(`Velocidad Máxima (º/seg)`, { x: x3, y, size, font })
    page2.drawText(`${v.codo_ulnaRad[2].toFixed(1)}`, { x: x4, y, size, font })

    y -= 50
    page2.drawText(`EMG`, { x, y, size, font })

    page2.drawLine({
      start: { x: x1 - 5, y: y - 15 },
      end: { x: x3 - 25, y: y - 15 }
    })
    font = helveticaBold
    size = 10
    y -= 30
    x2 += 40
    page2.drawText(`Parámetro`, { x: x1, y, size, font })
    page2.drawText(`Valor`, { x: x2, y, size, font })
    font = helvetica
    page2.drawLine({
      start: { x: x1 - 5, y: y - 10 },
      end: { x: x3 - 25, y: y - 10 }
    })
    
    y -= 25
    page2.drawText(`Amplitud Promedio (mV)`, { x: x1, y, size, font })
    page2.drawText(`${v.mean_sel.toPrecision(1)}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`Duración Movimiento (seg)`, { x: x1, y, size, font })
    page2.drawText(`${v.duracion_sel}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`Máx. Poder Espectral (V²/Hz)`, { x: x1, y, size, font })
    page2.drawText(`${v.max_power.toPrecision(1)}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`Frec. Máx. Poder Espectral (V²/Hz)`, { x: x1, y, size, font })
    page2.drawText(`${v.f_max.toFixed(1)}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`Promedio Poder Espectral (V²/Hz)`, { x: x1, y, size, font })
    page2.drawText(`${v.mean_power.toPrecision(1)}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`RMS`, { x: x1, y, size, font })
    page2.drawText(`${v.rms_sel.toPrecision(1)}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`RMS Normalizado (%)`, { x: x1, y, size, font })
    page2.drawText(`${v.rms_cvm.toFixed(1)}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`Promedio Normalizado (%)`, { x: x1, y, size, font })
    page2.drawText(`${v.mean_cvm.toFixed(1)}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`Mediana Poder Espectral (V2/Hz)`, { x: x1, y, size, font })
    page2.drawText(`${v.median_power.toPrecision(1)}`, { x: x2, y, size, font })
    
    y -= 25
    page2.drawText(`Frecuencia Media (Hz)`, { x: x1, y, size, font })
    page2.drawText(`${v.median_freq.toFixed(1)}`, { x: x2, y, size, font })

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
    const elemento = document.createElement('a')
    elemento.setAttribute('href', pdfDataUri)
    elemento.setAttribute('download', `Mediciones ACHS - Reporte Kine.pdf`)
    elemento.style.display = 'none'
    document.body.appendChild(elemento)
    elemento.click()
    document.body.removeChild(elemento)
  }

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