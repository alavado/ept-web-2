import { useQuery } from '@apollo/client'
import React from 'react'
import query from '../../../../graphql/queries/ept'
import { useParams } from 'react-router-dom'
import './VisorEPT.css'

const VisorEPT = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(query, { variables: { id }})

  if (loading) {
    return null
  }

  console.log(data)

  return (
    <div className="VisorEPT">
      <video
        src={'https://compsci.cl/ept/' + data.registroEpt.video.url}
        controls={true}
        className="VisorEPT__video"
      />
    </div>
  )
}

export default VisorEPT
