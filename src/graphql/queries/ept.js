import gql from 'graphql-tag'

const query = gql`
  query EPT($id: ID!) {
    registroEpt(id: $id) {
      id
      createdAt
      video {
        previewUrl
        url
      }
      datos_imu
    }
  }
`

export default query