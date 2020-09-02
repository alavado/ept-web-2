import React from 'react'
import { useSelector } from 'react-redux'

const EMG = () => {

  const { emgs } = useSelector(state => state.sensores)

  if (!emgs) {
    return null
  }

  return (
    <div style={{ display: 'flex' }}>
      {emgs.map(emg => (
        <div style={{ margin: '1.5em' }} key={emg.id}>
          <div>{emg.id}</div>
          <div>{emg.valores[0]}</div>
        </div>
      ))}
    </div>
  )
}

export default EMG
