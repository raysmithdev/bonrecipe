import { FETCH_RECIPES, FETCH_USER_RECIPES } from '../actions/types'

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_RECIPES:
            return action.payload
        case FETCH_USER_RECIPES:
            let fetchedRecipes = action.payload
            if(action.payload === undefined){
                fetchedRecipes = 'No Items to Display'
            }
            return fetchedRecipes
        default:
            return state
    }
}