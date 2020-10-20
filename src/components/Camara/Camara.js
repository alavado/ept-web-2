import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { esAndroid } from '../../helpers/devices'
import Icon from '@iconify/react'
import videoIcon from '@iconify/icons-mdi/video'
import stopIcon from '@iconify/icons-mdi/stop'
import classNames from 'classnames'
import './Camara.css'
import { useMutation } from '@apollo/client'
import uploadMutation from '../../graphql/mutations/upload'
import agregarEPTMutation from '../../graphql/mutations/agregarEPT'
import { useSelector, useDispatch } from 'react-redux'
import { graba, dejaDeGrabar } from '../../redux/ducks/sensores'
import { useParams, useHistory } from 'react-router-dom'
import queryPaciente from '../../graphql/queries/paciente'

const Camara = props => {

  const { id: paciente } = useParams()
  const { grabando, grabacion: grabacionIMU } = useSelector(state => state.sensores)
  const [grabacion, setGrabacion] = useState([])
  const [upload] = useMutation(uploadMutation)
  const [agregarEPT] = useMutation(agregarEPTMutation)
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const [subiendo, setSubiendo] = useState(false)

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setGrabacion((prev) => prev.concat(data))
      }
    },
    [setGrabacion]
  )

  const grabar = useCallback(() => {
    dispatch(graba())
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    })
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    )
    mediaRecorderRef.current.start()
  }, [dispatch, webcamRef, mediaRecorderRef, handleDataAvailable])

  const detenerGrabacion = useCallback(() => {
    mediaRecorderRef.current.stop()
    dispatch(dejaDeGrabar())
  }, [mediaRecorderRef, dispatch])

  const subirEjercicio = useCallback(async () => {
    if (subiendo) {
      return
    }
    if (grabacion.length) {
      setSubiendo(true)
      const file = new Blob(grabacion, { type: "video/webm" })
      try {
        const { data: { upload: { id: video } } } = await upload({ variables: { file } })
        await agregarEPT({
          variables: { paciente, video, datosIMU: grabacionIMU },
          refetchQueries: [{
            query: queryPaciente,
            variables: { id: paciente }
          }]
        })
        history.go(-2)
      } catch (e) {
        console.log(e)
        setSubiendo(false)
      }
    }
  }, [grabacion, upload, agregarEPT, paciente, grabacionIMU, subiendo, history])

  const { width, height } = window.screen

  return (
    <div className="Camara">
      <button onClick={() => dispatch({ type: 'sensores/grabar_emg' })}>
        Enviar
      </button>
      <Webcam
        videoConstraints={{
          aspectRatio: esAndroid() ? (height / (width - 55)) : (width / (height - 55)),
          height: esAndroid() ? width : (height - 55),
          width: esAndroid() ? (height - 55) : width,
          facingMode: 'environment'
        }}
        ref={webcamRef}
      />
      {props.children}
      <div className="Camara__inferior">
        {grabacion.length > 0 ? (
          <button onClick={subirEjercicio}>{subiendo ? 'Enviando datos...' : 'Analizar'}</button>
        ) :
        <button
          onClick={() => grabando ? detenerGrabacion() : grabar()}
          className={classNames({
            'Camara__boton_grabar': true,
            'Camara__boton_grabar--activo': grabando
          })}
        >
          <Icon icon={grabando ? stopIcon : videoIcon} />
        </button>
        }
      </div>
    </div>
  )
}

export default Camara
