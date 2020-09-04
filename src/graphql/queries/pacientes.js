import gql from 'graphql-tag'

const query = gql`
  {
    pacientes {
      id
      nombres
      apellido_paterno
      apellido_materno
      foto {
        url
      }
    }
  }
`

export default query