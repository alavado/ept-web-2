import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { seleccionaProyecto } from '../../redux/ducks/proyecto'
import './Header.css'

const Header = () => {

  const dispatch = useDispatch()

  return (
    <div className="Header">
      <Link to="/">
        <h1 className="Header__titulo">ACHS Mediciones</h1>
      </Link>
      <select
        className="Header__selector"
        onChange={e => dispatch(seleccionaProyecto(e.target.value))}
      >
        <option>EPT</option>
        <option>Kinesiología</option>
      </select>
    </div>
  )
}

export default Header
