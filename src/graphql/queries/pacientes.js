import gql from 'graphql-tag'

const query = gql`
  {
    pacientes {
      id
      nombres
      apellido_paterno
      apellido_materno
    }
  }
`

export default query