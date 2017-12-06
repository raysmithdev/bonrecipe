import { combineReducers } from 'redux'
import recipeReducer from './recipeReducer'
import authReducer from './authReducer'
import accountRecipesReducer from './accountRecipesReducer'

export default combineReducers({
    recipes: recipeReducer, 
    accountRecipes: accountRecipesReducer,
    auth: authReducer
})