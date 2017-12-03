import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <Link to='/'><h1 className="Header-title">
                    <i className="fa fa-cutlery fa-1x" aria-hidden="true"></i>
                    Bon Recipe</h1>
                </Link>
                <Link to='/account'><h4>Account</h4></Link>
            </header>
        )
    }
}

export default Header