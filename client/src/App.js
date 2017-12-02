import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './components/Header'
import Home from './components/Mainpage/Home'
import Login from './components/Login/Login'
import Account from './components/Account/Account'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/account' component={Account} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect()(App)
