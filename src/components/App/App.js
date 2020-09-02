import React from 'react'
import Header from '../Header'
import GLB from '../GLB'
import './App.css'
import IMUs from '../IMUs'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login'
import Conexion from '../Conexion'

const App = () => {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/conexion" component={Conexion} />
        <Route path="/bla" component={() => <><IMUs /><GLB /></>} />
      </Switch>
    </div>
  )
}

export default App
