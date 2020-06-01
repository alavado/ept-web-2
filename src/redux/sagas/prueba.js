import { urlServidorWS } from "../../config/urls"
import { w3cwebsocket } from 'websocket'

export function* webSocketSaga() {
  const socket = new w3cwebsocket(urlServidorWS, 'message')
  let msg = null
  socket.onmessage = e => {
    if (typeof e.data === 'string') {
      msg = JSON.parse(e.data)
    }
  }
  socket.onerror = () => {
  }
  socket.onopen = () => {
  }
  socket.onclose = () => {
  }
  while (true) {
    yield msg
  }
}