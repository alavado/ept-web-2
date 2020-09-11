import React from 'react'
import './Header.css'

const titulo: string = 'Mediciones ACHS'

const Header = (): JSX.Element => {
  return (
    <div className="Header">
      <h1>{titulo}</h1>
    </div>
  )
}

export default Header
