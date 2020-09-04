import gql from 'graphql-tag'

const query = gql`
  query Paciente($id: ID!) {
    paciente(id: $id) {
      id
      nombres
      apellido_paterno
      apellido_materno
      fecha_nacimiento
      lateralidad
      diagnostico
      sexo
      foto {
        url
      }
    }
  }
`

export default query