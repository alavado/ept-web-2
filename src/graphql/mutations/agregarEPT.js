import gql from 'graphql-tag'

const mutation = gql`
  mutation AgregarEPT(
    $paciente: ID!
    $video: ID
    $datos_imu: ID
  ) {
    createRegistroEpt (input: {
      data: {
        paciente: $paciente
        video: $video
        datos_imu: $datos_imu
      }
    }) {
      registroEpt {
        id
      }
    }
  }
`

export default mutation