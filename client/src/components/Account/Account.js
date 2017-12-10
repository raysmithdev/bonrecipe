import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserRecipes } from '../../actions/index'
import './css/Account.css'

class Account extends Component {
    // componentWillMount() {
    //     if (!this.props.auth.id || this.props.auth.id === undefined) {
    //         this.props.history.push('/login')
    //     }
    // }
    componentDidMount() {
        this.props.dispatch(fetchUserRecipes(this.props.auth.id, this.props.auth.service))
    }

    render() {
        console.log(this.props)
        console.log(this.props.auth.id )
        let sysRecipeList = '',
            userRecipeList = ''
        if (this.props.accountRecipes[0] instanceof String || typeof this.props.accountRecipes[0] === 'string') {
            sysRecipeList = this.props.accountRecipes
                userRecipeList = this.props.accountRecipes
        } else {
            const sysRecipes = this.props.accountRecipes[0],
                userRecipes = this.props.accountRecipes[1]

            sysRecipeList = sysRecipes.map((recipe) => {
                const ingredList = recipe.ingredients.map((item, i) => {
                    return <div key={i} className="ingredients">{i+1}. {item}</div>
                })
                return (
                    <div key={recipe.id} className="tab">
                        <input id={recipe.id} type="checkbox" />
                        <label htmlFor={recipe.id}>{recipe.name}</label>
                        <div className="tab-content">
                           <section className="imageSection">
                           <img src={recipe.image} alt={recipe.name}/>
                            <span>Cook Time: {recipe.cookTime}</span>                          
                            </section>
                           <section className="ingredSection">
                                <h4>Ingredients:</h4>
                                <aside>{ingredList}</aside>
                           </section>
                        </div>
                    </div>
                )
            })
            userRecipeList = userRecipes.map((recipe, i) => {
                return (
                    <div key={recipe + i} className="tab">
                        <input id={recipe + i} type="checkbox" />
                        <label htmlFor={recipe + i}>Label One</label>
                        <div className="tab-content">
                            <p>{recipe}</p>
                        </div>
                    </div>
                )
            })
        }

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
                        {userRecipeList}
                    </section>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth, accountRecipes }) { return { auth, accountRecipes } }
export default connect(mapStateToProps)(Account)