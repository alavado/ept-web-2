import gql from 'graphql-tag'

const mutation = gql`
  mutation AgregarEPT(
    $paciente: ID!
    $video: ID
  ) {
    createRegistroEpt (input: {
      data: {
        paciente: $paciente
        video: $video
      }
    }) {
      registroEpt {
        id
      }
    }
  }
`

export default mutation