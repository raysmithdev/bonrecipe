import React, { Component } from 'react'
import './css/SearchBar.css'

class SearchBar extends Component {
    render() {
        return (
            <div className="SearchBar">
                <form action="">
                    <input type="text" autoFocus />
                    <input type="button" value="Search" onClick={() => this.props.fetchRecipes()}/>
                </form>
            </div>
        )
    }
}

export default SearchBar
