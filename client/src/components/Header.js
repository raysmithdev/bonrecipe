import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogout } from '../actions/index'


class Header extends Component {
    renderContent() {
        console.log(localStorage)
        console.log(this.props)

        // switch (false) {
        switch (!this.props.auth.id) {
            case null:
                return
            case false:
                return <header className="Header">
                    <Link to='/'><h1 className="Header-title">
                        <i className="fa fa-cutlery fa-1x" aria-hidden="true"></i>
                        Bon Recipe</h1>
                    </Link>
                    <div className="headerNav">
                        <p>Hello, {this.props.auth.name}!</p>
                        <p>|</p>                        
                        <Link to='/account'><p>Account</p></Link>
                        <p>|</p>
                        <a href='http://localhost:5000/auth/logout' onClick={() => this.props.dispatch(onLogout())}>Logout</a>
                    </div>
                </header>
            default:
                return <header className="Header">
                    <h1 className="Header-title">
                        <i className="fa fa-cutlery fa-1x" aria-hidden="true"></i>
                        Bon Recipe</h1>
                </header>
        }
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps({ auth }) { return { auth } }
export default connect(mapStateToProps)(Header)