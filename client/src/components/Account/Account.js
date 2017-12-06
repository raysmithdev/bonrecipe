import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserRecipes } from '../../actions/index'

class Account extends Component {
    componentDidMount() {
        console.log(this.props.recipes)
        this.props.dispatch(fetchUserRecipes(this.props.auth.id, this.props.auth.service))
    }

    render() {
        return (
            <div className="Account">
                <h1>{this.props.auth.name}'s Account</h1>
                <p>{this.props.recipes}</p>
            </div>
        )
    }
}

function mapStateToProps({ auth, recipes }) { return { auth, recipes } }
export default connect(mapStateToProps)(Account)