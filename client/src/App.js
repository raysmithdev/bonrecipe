import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

import Header from './components/Header'
import Home from './components/Mainpage/Home'
import Login from './components/Login/Login'
import Account from './components/Account/Account'
import './App.css'

class App extends Component {
  componentDidMount() {
    const userId = localStorage.getItem('userId')
    const userEmail = localStorage.getItem('userEmail')
    const userName = localStorage.getItem('userName')
    const userService = localStorage.getItem('userService')

    if (userId && userEmail) {
      this.props.dispatch(actions.fetchUserSuccess(userId, userEmail, userName, userService))
    
    } 
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/:userId/:userEmail/:userName/:userService' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/account' component={Account} />
              <Redirect to='/'/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect()(App)
