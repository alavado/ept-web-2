import gql from 'graphql-tag'

const query = gql`
  {
    pacientes {
      id
      nombres
      apellido_paterno
      apellido_materno
      diagnostico
      fecha_nacimiento
      foto {
        url
      }
    }
  }
`

export default query