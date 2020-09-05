import gql from 'graphql-tag'

const mutation = gql`
  mutation EditarPaciente(
    $id: ID!
    $nombres: String
    $apellidoPaterno: String
    $apellidoMaterno: String
    $sexo: ENUM_PACIENTE_SEXO
    $lateralidad: ENUM_PACIENTE_LATERALIDAD
    $fechaDeNacimiento: Date
    $diagnostico: String
    $foto: ID
  ) {
    updatePaciente(
      input: {
        where: {
          id: $id
        }
        data: {
          nombres: $nombres
          apellido_paterno: $apellidoPaterno
          apellido_materno: $apellidoMaterno
          sexo: $sexo
          lateralidad: $lateralidad
          fecha_nacimiento: $fechaDeNacimiento
          diagnostico: $diagnostico
          foto: $foto
        }
      }
    ) {
      paciente {
        id
      }
    }
  }
`

export default mutation
