import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { esAndroid } from '../../helpers/devices'
import Icon from '@iconify/react'
import videoIcon from '@iconify/icons-mdi/video'
import './Camara.css'

const Camara = props => {

  const [grabando, setGrabando] = useState(false)
  const [grabacion, setGrabacion] = useState([])
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setGrabacion((prev) => prev.concat(data))
      }
    },
    [setGrabacion]
  )

  const grabar = useCallback(() => {
    setGrabando(true)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    })
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    )
    mediaRecorderRef.current.start()
  }, [webcamRef, setGrabando, mediaRecorderRef, handleDataAvailable])

  const detenerGrabacion = useCallback(() => {
    mediaRecorderRef.current.stop()
    setGrabando(false)
  }, [mediaRecorderRef, setGrabando])

  const handleDownload = React.useCallback(() => {
    if (grabacion.length) {
      const blob = new Blob(grabacion, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setGrabacion([]);
    }
  }, [grabacion]);

  const { width, height } = window.screen

  return (
    <div className="Camara">
      <Webcam
        videoConstraints={{
          aspectRatio: esAndroid ? (height / (width - 55)) : (width / (height - 55)),
          height: esAndroid() ? width : (height - 55),
          width: esAndroid() ? (height - 55) : width,
          facingMode: 'environment'
        }}
        ref={webcamRef}
      />
      {props.children}
      <div className="Camara__inferior">
        <button onClick={() => grabando ? detenerGrabacion() : grabar()} className="Camara__boton_grabar">
          <Icon icon={videoIcon} style={{ color: grabando ? 'red' : 'white' }} />
        </button>
        {grabacion.length > 0 && (
          <button onClick={handleDownload}>Download</button>
        )}
      </div>
    </div>
  )
}

export default Camara
