import gql from 'graphql-tag'

const mutation = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      id
    }
  }
`

export default mutation