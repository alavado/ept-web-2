import { urlServidorWS } from "../../config/urls"
import { w3cwebsocket } from 'websocket'
import { put, takeEvery } from 'redux-saga/effects'
import { actualizarMediciones } from "../ducks/sensores"

const socket = new w3cwebsocket(urlServidorWS, 'message')
let msg = 'conectando'
socket.onmessage = e => {
  if (typeof e.data === 'string') {
    if (e.data !== 'no hay nada') {
      msg = JSON.parse(e.data)
    }
    socket.send('ack')
  }
}
socket.onerror = () => {
  msg = 'error en conexión ws'
}
socket.onopen = () => {
  msg = 'conexión ws establecida'
  socket.send('ack')
}
socket.onclose = () => {
  msg = 'conexión ws cerrada'
}

export function* webSocketSaga() {
  yield put(actualizarMediciones(msg))
}

export function* recordSaga() {
  yield socket.send('prueba')
}

export function* watchIncrementAsync() {
  yield takeEvery('sensores/actualizar_async', webSocketSaga)
}

export function* record() {
  yield takeEvery('sensores/grabar_emg', recordSaga)
}

export default function* rootSaga() {
  yield watchIncrementAsync()
  yield record()
}