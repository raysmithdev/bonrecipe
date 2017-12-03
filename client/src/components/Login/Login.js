import React, { Component } from 'react';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasAccount: true,
            tooltipText: `Have an Account?`,
            headerText: `Create An Account`,
            buttonText: `Register`
        }
    }

    handleClick() {
        this.setState({ hasAccount: !this.state.hasAccount })
        console.log(this.state)
        if (this.state.hasAccount === true) {
            return this.setState({
                tooltipText: `Don't Have an Account?`,
                headerText: `Welcome Back!`,
                buttonText: `Sign In`
            })
        } else {
            return this.setState({
                tooltipText: `Have an Account?`,
                headerText: `Create An Account`,
                buttonText: `Register`
            })
        }
    }

    render() {
        return (
            <div className="Login">
                <section className="module form-module">
                    <div className="toggle" onClick={() => this.handleClick()}><i className="fa fa-times fa-key"></i>
                        <div className="tooltip">{this.state.tooltipText}</div>
                    </div>
                    <h2>{this.state.headerText}</h2>
                    <form>
                        <input type="email" placeholder="Email Address" />
                        <input type="password" placeholder="Password" />
                        <button>{this.state.buttonText}</button>
                    </form>
                </section>
                <button className="googleBtn"></button>
                <button className="facebookBtn"></button>
            </div>
        )
    }
}

export default Login