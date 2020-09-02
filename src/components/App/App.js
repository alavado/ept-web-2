import React from 'react'
import Header from '../Header'
import GLB from '../GLB'
import './App.css'
import IMUs from '../IMUs'

const App = () => {

  return (
    <div className="App">
      <Header />
      <IMUs />
      <GLB />
    </div>
  )
}

export default App
