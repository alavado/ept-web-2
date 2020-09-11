import React from 'react'
import query from '../../../../graphql/queries/paciente'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import './PerfilPaciente.css'
import { urlArchivo, urlSinFoto } from '../../../../config/urls'
import { formatearEdad, formatearSexo, formatearLateralidad } from '../../../../helpers/formato'
import Avatar from '../../Avatar'
import { urltoFile } from '../../../../helpers/files'
import editarPacienteMutation from '../../../../graphql/mutations/editarPaciente'
import uploadMutation from '../../../../graphql/mutations/upload'
import { useHistory } from 'react-router-dom'

const PerfilPaciente = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id } })
  const [mutate] = useMutation(editarPacienteMutation)
  const [upload] = useMutation(uploadMutation)
  const history = useHistory()

  if (loading) {
    return null
  }
  const editarPaciente = async (variable, valor) => {
    if (variable === 'foto') {
      const file = await urltoFile(valor, 'foto_paciente.jpg', 'image/jpeg')
      const { data: { upload: { id: idNuevaFoto } } } = await upload({ variables: { file } })
      await mutate({
        variables: { id, foto: idNuevaFoto },
        refetchQueries: [{ query, variables: { id } }]
      })
    }
  }

  const { paciente: {
    nombres, apellido_paterno, apellido_materno, sexo, fecha_nacimiento, lateralidad, diagnostico
  } } = data
  const nombre = `${nombres} ${apellido_paterno} ${apellido_materno}`
  const subtitulo = `${formatearSexo(sexo)}, ${formatearLateralidad(lateralidad, sexo)}, ${formatearEdad(fecha_nacimiento)}`

  return (
    <div className="PerfilPaciente">
      <div className="PerfilPaciente__superior">
        <div className="PerfilPaciente__foto">
          <Avatar
            foto={data?.paciente.foto ? urlArchivo(data.paciente.foto.url) : urlSinFoto}
            setFoto={foto => editarPaciente('foto', foto)}
            alto={120}
            ancho={120}
          />
        </div>
        <div className="PerfilPaciente__datos">
          <h2 className="PerfilPaciente__nombre">{nombre}</h2>
          <p className="PerfilPaciente__subtitulo">{subtitulo}</p>
          <button
            className="PerfilPaciente__boton_agregar_hito"
            onClick={() => history.push(`/pacientes/${id}/agregar_registro`)}
          >
            Agregar registro
          </button>
        </div>
      </div>
      <div className="PerfilPaciente__contenedor_diagnostico">
        <h2 className="PerfilPaciente__titulo_diagnostico">Diagnóstico</h2>
        <p className="PerfilPaciente__diagnostico">{diagnostico}</p>
      </div>
    </div>
  )
}

export default PerfilPaciente
