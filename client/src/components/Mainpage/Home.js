import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import SearchBar from './SearchBar'
import ImageDisplay from './ImageDisplay'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, fetchUserSuccess } from '../../actions/index'

class Home extends Component {
    componentWillMount(){
        // if (!this.props.match.params.userId || !this.props.auth.id){
        //     this.props.history.push('/login')
        // }
    }
    componentDidMount() {
        this.props.fetchRecipes()
        if (this.props.match.params.userId) {
            localStorage.setItem('userId', this.props.match.params.userId)
            localStorage.setItem('userEmail', this.props.match.params.userEmail)
            localStorage.setItem('userName', this.props.match.params.userName)
            localStorage.setItem('userService', this.props.match.params.userService)
            this.props.fetchUserSuccess(
                this.props.match.params.userId, 
                this.props.match.params.userEmail, 
                this.props.match.params.userName,
                this.props.match.params.userService)
        } 
    }

    render() {


        return (
            <div>
                <SearchBar />
                <ImageDisplay recipeData={this.props.recipes}/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { recipes: state.recipes, auth: state.auth }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchRecipes, fetchUserSuccess }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
