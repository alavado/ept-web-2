import gql from 'graphql-tag'

const mutation = gql`
  mutation AgregarEPT(
    $paciente: ID!
    $video: ID
    $datosIMU: JSON
  ) {
    createRegistroEpt (input: {
      data: {
        paciente: $paciente
        video: $video
        datos_imu: $datosIMU
      }
    }) {
      registroEpt {
        id
      }
    }
  }
`

export default mutation