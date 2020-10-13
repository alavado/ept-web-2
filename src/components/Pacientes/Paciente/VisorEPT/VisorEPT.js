import { useQuery } from '@apollo/client'
import React from 'react'
import query from '../../../../graphql/queries/ept'
import { useParams } from 'react-router-dom'
import './VisorEPT.css'

const VisorEPT = () => {

  const { id } = useParams()
  const { data } = useQuery(query, { variables: { id }})

  console.log(data)

  return (
    <div className="VisorEPT">
      VisorEPT
    </div>
  )
}

export default VisorEPT
