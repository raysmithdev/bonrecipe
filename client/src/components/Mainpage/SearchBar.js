import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchRecipe } from '../../actions/index'

import './css/SearchBar.css'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: ' '
        }
    }
    onInputType(e) {
        this.setState({
            searchQuery: e.target.value
        })
    }

    handleSearchClick(e){
        e.preventDefault()
        let query = this.state.searchQuery
        query = query.trim().replace(' ', '+')
        this.props.dispatch(searchRecipe(query))
    }

    render() {
        return (
            <div className="SearchBar">
                <form>
                    <input type="text" autoFocus onChange={(e)=> this.onInputType(e)}/>
                    <input type="button" value="Search" onClick={(e) => this.handleSearchClick(e)} />
                </form>
            </div>
        )
    }
}
function mapStateToProps({ recipes }) { return { recipes } }
export default connect(mapStateToProps)(SearchBar)
