import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ImageDisplay from './ImageDisplay'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes } from '../../actions/index'

class Home extends Component {
    componentDidMount() {
        this.props.fetchRecipes()
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
    return bindActionCreators({ fetchRecipes }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
