import React, { useState, useEffect } from 'react'
import './App.css'
import { Line, Doughnut } from 'react-chartjs-2'
import Header from '../Header'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  
  const { imus } = useSelector(state => state.sensores)
  const dispatch = useDispatch()

  useEffect(() => {
    const actualizarSensores = () => dispatch({ type: 'sensores/actualizar_async' })
    const interval = setInterval(actualizarSensores, 22)
    return () => clearInterval(interval)
  }, [dispatch])

  if (!imus) {
    return null
  }

  return (
    <div>
      <Header />
      <div>
        {imus.map(imu => (
          <div style={{ margin: '2em' }} key={imu.mac}>
            <div>{imu.segmento}</div>
            <div>{imu.mac}</div>
            <div>{imu.angulosRelativos.map((angulo, i) => (
              <div key={`${imu.mac}-angulo-${i}`}>{angulo}</div>
            ))}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
//   const [datos, setDatos] = useState({
//     rotaciones: [],
//     emg: {
//       t: [],
//       v: []
//     }
//   })
//   const [activacion, setActivacion] = useState(0)

//   const conectar = ip => {
//     const socket = new w3cwebsocket(`ws://${ip}`, 'message')
//     console.log('conectando...')
//     socket.onerror = () => {
//     }
//     socket.onopen = () => {
//     }
//     socket.onclose = () => {
//     }
//     socket.onmessage = e => {
//       if (typeof e.data === 'string') {
//         const obj = JSON.parse(e.data)
//         setDatos(prev => {
//           if (prev.emg.v.length > 1) {
//             const maximo = prev.emg.v.slice(-25).reduce((y, x) => Math.max(y, x))
//             const minimo = prev.emg.v.slice(-25).reduce((y, x) => Math.min(y, x))
//             setActivacion(() => maximo - minimo)
//           }
//           return {
//             rotaciones: [...prev.rotaciones,
//               Object.keys(obj.r).map(mac => ({ mac, q: obj.r[mac] }))
//             ].slice(-30),
//             emg: {
//               t: [...prev.emg.t, ...obj.e.t],
//               v: [...prev.emg.v, ...obj.e.v]
//             }
//           }
//         })
//       }
//     }
//   }

//   useEffect(() => {
//     const avanzarSerie = setInterval(() => {
//       setDatos(prev => {
//         let { t, v } = prev.emg
//         while (t.length > 90) {
//           t.shift()
//           v.shift()
//         }
//         return {
//           ...prev,
//           emg: {
//             t,
//             v
//           }
//         }
//       })
//     }, 22)
//     return () => {
//       clearInterval(avanzarSerie)
//     }
//   }, [])

//   const obtenerSegmento = i => {
//     switch (i) {
//       case 0: return ['Mano', 'Muñeca']
//       case 1: return ['Antebrazo', 'Codo']
//       default: return ['Brazo', 'Hombro']
//     }
//   }

//   const traducirAngulo = a => {
//     switch (a) {
//       case 'roll': return 'x'
//       case 'pitch': return 'y'
//       default: return 'z'
//     }
//   }

//   return (
//     <div className="App">
//       <Header />
//       <button onClick={e => conectar(urlServidorWS)}>Conectar con Raspberry Pi</button>
//       <div className="App__emg">
//         <h1>EMG</h1>
//         <div style={{flex:1}}>
//           <Line
//             data={{
//               labels: datos.emg.t.slice(0, 90).reverse(),
//               datasets: [
//                 {
//                   label: 'emg',
//                   data: datos.emg.v.slice(0, 90).reverse().map((x, i, arr) => {
//                     const indiceInicial = Math.max(0, i - 10)
//                     const indiceFinal = Math.min(i + 10, arr.length - 1)
//                     return arr
//                       .slice(indiceInicial, indiceFinal)
//                       .reduce((sum, y) => sum + (y < 550 ? (550 + (550 - y)) : y), 0) / (indiceFinal - indiceInicial)
//                   }),
//                   pointRadius: 0,
//                   fill: false
//                 }
//               ],
//             }}
//             options={{
//               maintainAspectRatio: false,
//               animation: {
//                 duration: 0
//               },
//               legend: {
//                 display: false
//               },
//               scales: {
//                 yAxes: [{
//                   ticks: {
//                     suggestedMin: 550,
//                     suggestedMax: 700,
//                     autoSkip: false,
//                     stepSize: 50
//                   },
//                   gridLines: {
//                     display: false,
//                   }
//                 }],
//                 xAxes: [{
//                   gridLines: {
//                     display: false
//                   },
//                   ticks: {
//                     display: false
//                   }
//                 }]
//               }
//             }}
//           />
//         </div>
//         <div style={{flex: 1}}>
//           <Doughnut
//             data={{
//               labels: ['Activacion'],
//               datasets: [{
//                 data: [activacion, Math.max(0, 2 * 550 - activacion)],
//                 backgroundColor: ['red', 'transparent'],
//                 borderColor: 'transparent'
//               }]
//             }}
//             options={{
//               maintainAspectRatio: false,
//               cutoutPercentage: 50,
//               rotation: -Math.PI,
//               animation: {
//                 duration: 100
//               },
//               legend: {
//                 display: true
//               }
//             }}
//           />
//           </div>
//         </div>
//       <div className="App__angulos">
//         <h1>Ángulos</h1>
//         {datos.rotaciones[0] && datos.rotaciones.slice(-1)[0].map(({ mac }, i) => {
//           let cuaterniones = datos.rotaciones.map(d => d.find(r => r.mac === mac).q)
//           // console.log({cuaterniones})
//           // const [wMano, xMano, yMano, zMano] = cuaterniones[0]
//           // const [wAntebrazo, xAntebrazo, yAntebrazo, zAntebrazo] = cuaterniones[1]
//           // cuaterniones[0] =
//           //   (new Quaternion(wMano, xMano, yMano, zMano)).mul(
//           //     new Quaternion(wAntebrazo, xAntebrazo, yAntebrazo, zAntebrazo).inverse()
//           //   ).toVector()
//           const euler = cuaterniones.map(q => toEulerAngles(q))
//           const colores = ['red', 'green', 'blue']
//           return (
//           <div key={`${mac}-sensor-${i}`} className="App__angulos_segmento">
//             <h1>{obtenerSegmento(i)[1]}</h1>
//             <h2>{`Sensor en el ${obtenerSegmento(i)[0]} (MAC: ${mac})`}</h2>
//             <Line
//               data={{
//                 labels: euler.map((e, i) => i),
//                 datasets: ['roll', 'pitch', 'yaw'].map((a, i) => ({
//                   data: euler.map(rot => rot[a]),
//                   fill: false,
//                   pointRadius: 0,
//                   borderColor: colores[i],
//                   label: traducirAngulo(a)
//                 }))
//               }}
//               options={{
//                 scales: {
//                   yAxes: [{
//                     ticks: {
//                       suggestedMin: -180,
//                       suggestedMax: 180,
//                       stepSize: 60
//                     },
//                     gridLines: {
//                       display: false
//                     }
//                   }],
//                   xAxes: [{
//                     gridLines: {
//                       display: false
//                     },
//                     ticks: {
//                       display: false
//                     }
//                   }]
//                 },
//                 animation: {
//                   duration: 0
//                 },
//                 legend: {
//                   position: 'bottom'
//                 }
//               }}
//             />
//           </div>
//         )})}
//       </div>
//       {/* <p>{mensaje}</p> */}
//     </div>
//   )
// }

// export default App
