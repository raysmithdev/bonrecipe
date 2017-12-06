import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserRecipes } from '../../actions/index'
import './css/Account.css'

class Account extends Component {
    componentDidMount() {
        console.log(this.props.accountRecipes)
        this.props.dispatch(fetchUserRecipes(this.props.auth.id, this.props.auth.service))
    }

    render() {
        const sysRecipes = this.props.accountRecipes[0],
            userRecipes = this.props.accountRecipes[1]

        const sysRecipeList = sysRecipes.map((recipe, i) => {
            return (
                <div key={recipe + i} className="tab">
                    <input id={recipe + i} type="checkbox" name="tabs2" />
                    <label htmlFor={recipe + i}>Label One</label>
                    <div className="tab-content">
                        <p>{recipe}</p>
                    </div>
                </div>
            )
        })

        const usersRecipeList = userRecipes.map((recipe, i) => {
            return (
                <div key={recipe + i} className="tab">
                    <input id={recipe + i} type="checkbox" name="tabs2" />
                    <label htmlFor={recipe + i}>Label One</label>
                    <div className="tab-content">
                        <p>{recipe}</p>
                    </div>
                </div>
            )
        })

        return (
            <div className="Account">
                <h1>{this.props.auth.name}'s Account</h1>
                <div className="listContainer">
                    <section className="sysRecipeBlock">
                        <h3>Saved Recipes</h3>
                        {sysRecipeList}
                    </section>
                    <section className="userRecipeBlock">
                        <h3>Your Recipes</h3>
                        {usersRecipeList}
                    </section>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth, accountRecipes }) { return { auth, accountRecipes } }
export default connect(mapStateToProps)(Account)