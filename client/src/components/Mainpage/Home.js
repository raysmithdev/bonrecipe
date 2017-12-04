import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ImageDisplay from './ImageDisplay'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, fetchUserSuccess } from '../../actions/index'

class Home extends Component {
    componentDidMount() {
        this.props.fetchRecipes()
        
        if (this.props.match.params.userId) {
            localStorage.setItem('userId', this.props.match.params.userId)
            localStorage.setItem('userEmail', this.props.match.params.userEmail)
            localStorage.setItem('userName', this.props.match.params.userName)
            this.props.fetchUserSuccess(this.props.match.params.userId, this.props.match.params.userEmail, this.props.match.params.userName)
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
    return { recipes: state.recipes }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchRecipes, fetchUserSuccess }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
