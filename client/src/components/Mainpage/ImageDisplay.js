import React, {Component} from 'react'
import './css/ImageDisplay.css'

class ImageDisplay extends Component {
    render() {
        const recipeData = this.props.recipeData
        const recipeList = recipeData.map(recipe => {
            const ingredients = recipe.ingredients.join().split(",")
            const ingredList = ingredients.map((item, i) => {
                return <li key={i} className="ingredients">{item}</li>
            })
            
            return (
                <div key={recipe.id} className="recipeItems">
                    <img src={recipe.imageUrlsBySize[90]} alt={recipe.recipeName}/>
                    <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                    <div className="tooltip"><p>{recipe.recipeName}</p>
                        <span className="tooltiptext">Ingredients: <ul>{ingredList}</ul></span>
                    </div>
                </div>
            )
        })
        return (
            <div className="ImageDisplay">
                <section>
                    {recipeList}
                </section>
            </div>
        )
    }
}

export default ImageDisplay