import React from 'react'
import Header from '../Header'
import GLB from '../GLB'
import './App.css'
import IMUs from '../IMUs'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login'
import Conexion from '../Conexion'
import Pacientes from '../Pacientes'
import FormPaciente from '../Pacientes/FormPaciente'

const App = () => {

  return (
    <div className="App">
      <Header />
      <div className="App__contenedor">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/pacientes" component={Pacientes} />
          <Route exact path="/pacientes/nuevo" component={FormPaciente} />
          <Route exact path="/pacientes/:id" component={Pacientes} />
          <Route path="/conexion" component={Conexion} />
          <Route path="/bla" component={() => <><IMUs /><GLB /></>} />
        </Switch>
      </div>
    </div>
  )
}

export default App
