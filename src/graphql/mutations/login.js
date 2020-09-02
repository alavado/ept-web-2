import gql from 'graphql-tag'

const mutation = gql`
  mutation($identifier: String!, $password: String!) {
    login(input:{
      identifier: $identifier,
      password: $password
    }) {
      jwt
    }
  }
`

export default mutation