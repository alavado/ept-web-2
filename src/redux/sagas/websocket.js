import { urlServidorWS } from "../../config/urls"
import { w3cwebsocket } from 'websocket'
import { put, takeEvery } from 'redux-saga/effects'
import { actualizarMediciones } from "../ducks/sensores"

const socket = new w3cwebsocket(urlServidorWS, 'message')
let msg = 'conectando'
socket.onmessage = e => {
  if (typeof e.data === 'string') {
    msg = JSON.parse(e.data)
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

export function* watchIncrementAsync() {
  yield takeEvery('sensores/actualizar_async', webSocketSaga)
}

export default function* rootSaga() {
  yield watchIncrementAsync()
}