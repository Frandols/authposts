import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css'

import SignInUp from './containers/SignInUp'
import Home from './components/Home'

function App() {
  const token = localStorage.getItem('accessToken')
  return (
    <Router>
      <Route exact path="/">
        { token ? <Home/> : <Redirect to="/sign"/> }
      </Route>
      <Route exact path="/sign">
        { !token ? <SignInUp/> : <Redirect to="/"/> }
      </Route>
    </Router>
  )
}

export default App
