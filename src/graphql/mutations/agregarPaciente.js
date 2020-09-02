import gql from 'graphql-tag'

const mutation = gql`
  mutation AgregarPaciente(
    $nombres: String!
    $apellidoPaterno: String!
    $apellidoMaterno: String
    $sexo: ENUM_PACIENTE_SEXO
    $lateralidad: ENUM_PACIENTE_LATERALIDAD
    $fechaDeNacimiento: Date!
    $diagnostico: String
  ) {
    createPaciente(input: {
      data: {
        nombres: $nombres
        apellido_paterno: $apellidoPaterno
        apellido_materno: $apellidoMaterno
        sexo: $sexo
        lateralidad: $lateralidad
        fecha_nacimiento: $fechaDeNacimiento
        diagnostico: $diagnostico
      }
    }) {
      paciente {
        id
      }
    }
  }
`

export default mutation
